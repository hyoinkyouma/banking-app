import { useState } from "react";
import { transactionLogging, billsPayment } from "../utils/changeBalance";

export const Budget = (props) => {
  const [expenseName, setExpenseName] = useState("");
  const [fundsInput, setFundsInput] = useState(0);

  const handleAddExpense = async () => {
    if (expenseName !== "" && fundsInput !== 0) {
      const msg = expenseName;
      const balance = props.currentUser.balance;
      const amount = fundsInput;
      const id = props.currentUser._id;
      const result = await billsPayment(
        msg,
        balance,
        amount,
        id,
        transactionLogging
      );
      props.setCurrentUser(await result);
      setFundsInput(0);
      setExpenseName("");
    }
  };

  return (
    <div className="col s12 m6 l6">
      <div className="card hoverable z-depth-3 blue-grey darken-1">
        <div className="card-content white-text" style={{ padding: "0" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 2rem",
              gap: "0",
            }}
          >
            <h5 className="card-title">Budget</h5>
          </div>
          <div
            className="row center"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="col s12" style={{ padding: "0 2rem" }}>
              <div>
                <div className="input-field ">
                  <input
                    id="expenseInput"
                    type="text"
                    className="validate white-text"
                    value={expenseName}
                    onChange={(e) => {
                      if (e.target.value.length > 20) return;
                      setExpenseName(e.target.value);
                    }}
                  />
                  <label htmlFor="expenseInput">Expense Name</label>
                </div>
              </div>
            </div>
            <div
              className="col s12"
              style={{
                padding: " 0 2rem",
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div className="input-field ">
                <input
                  id="fundsInput"
                  type="number"
                  className="validate white-text"
                  value={fundsInput === 0 ? "" : fundsInput}
                  onChange={(e) => {
                    setFundsInput(e.target.value);
                  }}
                />
                <label htmlFor="fundsInput">Expense Cost</label>
              </div>
              <button
                onClick={handleAddExpense}
                className="btn waves-effect waves-green"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="card-action">
          <a href="#transactionModal">See History</a>
        </div>
      </div>
    </div>
  );
};
