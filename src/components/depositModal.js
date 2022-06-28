import { useState } from "react";
import { deposit, transactionLogging } from "../utils/changeBalance";
import financialUtils from "../utils/financialUtils";
import M from "materialize-css/dist/js/materialize.min.js";

function DepositModal(prop) {
  const [amount, setAmout] = useState(0);

  const handleInput = (event) => {
    if (!Number(event.target.value) && event.target.value === 0) return;
    setAmout(Number(event.target.value));
  };

  const changeBalanceDeposit = async () => {
    if (amount <= 0) {
      M.toast({ html: "Invalid Amount" });
      console.log("invalid");
      return;
    }
    const newBalance = await deposit(
      Number(prop.currentUser.balance),
      Number(amount),
      prop.currentUser._id,
      transactionLogging
    );
    prop.setCurrentUser(newBalance);
    setAmout(0);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const submit = document.querySelectorAll(".modal-close");
      submit[0].click();
    }
  };

  return (
    <div
      id="depositModal"
      className="modal modalDeposit"
      style={{ gap: "1rem", display: "none", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Deposit</h4>
        <h5>
          Balance:
          {financialUtils.numToFinString.format(
            prop.currentUser.balance + Number(amount)
          )}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="last_name"
            type="number"
            className="validate"
            value={amount === 0 ? "" : amount}
            onChange={handleInput}
            onKeyDown={handleEnterKey}
          />
          <label htmlFor="last_name">Deposit Amount</label>
        </div>

        <button
          className="btn modal-close center deposit-modal waves-effect waves-green"
          onClick={changeBalanceDeposit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default DepositModal;
