import { useState, useEffect } from "react";
import { transactionLogging, withdraw } from "../utils/changeBalance";
import financialUtils from "../utils/financialUtils";
import M from "materialize-css/dist/js/materialize.min.js";

function WithdrawModal(prop) {
  const [amount, setAmout] = useState(0);

  const handleInput = (event) => {
    if (event.target.value > prop.currentUser.balance) return;
    setAmout(Number(event.target.value));
  };

  const changeBalanceDeposit = async () => {
    if (amount <= 0) {
      M.toast({ html: "Invalid Amount" });
      console.log("invalid");
      return;
    }
    const result = await withdraw(
      Number(prop.currentUser.balance),
      Number(amount),
      prop.currentUser._id,
      transactionLogging
    );
    prop.setCurrentUser(result);
    setAmout(0);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const submit = document.querySelectorAll(".modal-close");
      submit[1].click();
    }
  };

  return (
    <div
      id="withdrawModal"
      className="modal modalWithdraw"
      style={{ gap: "1rem", display: "none", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Withdraw</h4>
        <h5>
          Balance:
          {financialUtils.numToFinString.format(
            prop.currentUser.balance - Number(amount)
          )}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="widthdraw"
            type="number"
            className="validate"
            value={amount === 0 ? "" : amount}
            onChange={handleInput}
            onKeyDown={handleEnterKey}
          />
          <label htmlFor="widthdraw">Withdraw Amount</label>
        </div>
        <button
          className="btn modal-close waves-effect waves-green deposit-modal"
          onClick={changeBalanceDeposit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default WithdrawModal;
