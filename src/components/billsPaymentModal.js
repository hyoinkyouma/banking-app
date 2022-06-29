import { useState, useEffect } from "react";
import { billsPayment, transactionLogging } from "../utils/changeBalance";
import financialUtils from "../utils/financialUtils";
import M from "materialize-css/dist/js/materialize.min.js";

function BillsModal(prop) {
  const [amount, setAmout] = useState(0);
  const [refId, setRefId] = useState("");
  const [merchant, setMerchant] = useState("");

  useEffect(() => {
    const elems = document.querySelectorAll(".autocomplete");
    const options = {
      data: {
        Meralco: null,
        Globe: null,
        Smart: null,
        Lazada: null,
        Shopee: null,
        PLDT: null,
        Maynilad: null,
      },
      onAutocomplete: (val) => {
        setMerchant(val);
      },
    };
    const instances = M.Autocomplete.init(elems, options);
  }, [merchant]);

  const handleInput = (event) => {
    if (!Number(event.target.value) && event.target.value === 0) return;
    setAmout(Number(event.target.value));
  };
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const submit = document.querySelectorAll(".modal-close");
      submit[2].click();
    }
  };

  const changeBalanceBills = async () => {
    if (amount <= 0) {
      M.toast({ html: "Invalid Amount" });
      console.log("invalid");
      return;
    }
    const newValue = await billsPayment(
      `Paid ${merchant}`,
      Number(prop.currentUser.balance),
      Number(amount),
      prop.currentUser._id,
      transactionLogging
    );
    prop.setCurrentUser(newValue);
    setAmout(0);
    setRefId("");
  };

  return (
    <div
      id="billsModal"
      className="modal modalBills"
      style={{ gap: "1rem", display: "none", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Bills Payment</h4>
        <h5>
          Balance:
          {financialUtils.numToFinString.format(
            prop.currentUser.balance - Number(amount)
          )}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="refId"
            type="number"
            className="validate"
            value={refId}
            onChange={(e) => {
              setRefId(e.target.value);
            }}
            onKeyDown={(e) => {
              handleEnterKey(e);
            }}
          />
          <label htmlFor="refId">Referrence Id</label>
        </div>
        <div className="input-field col s6">
          <input
            id="autocomplete-input"
            className="autocomplete validate"
            type="text"
            value={merchant}
            onChange={(e) => {
              setMerchant(e.target.value);
            }}
            onKeyDown={(e) => {
              handleEnterKey(e);
            }}
          />
          <label htmlFor="autocomplete-input">Merchant</label>
        </div>
        <div className="input-field col s6">
          <input
            id="amount"
            type="number"
            className="validate"
            value={amount === 0 ? "" : amount}
            onChange={handleInput}
            onKeyDown={(e) => {
              handleEnterKey(e);
            }}
          />
          <label htmlFor="amount">Payment Amount</label>
        </div>

        <button
          className="btn modal-close bills-submit center deposit-modal waves-effect waves-green"
          onClick={changeBalanceBills}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default BillsModal;
