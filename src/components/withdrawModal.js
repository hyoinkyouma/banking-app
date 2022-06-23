import { useState } from "react";
import { transactionLogging, withdraw } from "../utils/changeBalance";
import financialUtils from "../utils/financialUtils";

function WithdrawModal(prop) {
  const [amount, setAmout] = useState(0);

  const handleInput = (event) => {
    if (event.target.value > prop.balance) return;
    setAmout(Number(event.target.value));
  };

  const changeBalanceDeposit = () => {
    prop.setBalance(
      withdraw(Number(prop.balance), Number(amount), transactionLogging)
    );
    setAmout(0);
  };

  return (
    <div
      id="withdrawModal"
      className="modal modalWithdraw"
      style={{ gap: "1rem", display: "flex", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Deposit</h4>
        <h5>
          Balance:
          {financialUtils.numToFinString.format(prop.balance - Number(amount))}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="last_name"
            type="number"
            className="validate"
            value={amount === 0 ? "" : amount}
            onChange={handleInput}
          />
          <label htmlFor="last_name">Withdraw Amount</label>
        </div>
        <button
          className="btn modal-close waves-effect waves-green"
          onClick={changeBalanceDeposit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default WithdrawModal;
