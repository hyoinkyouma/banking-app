import React, { useEffect, useState } from "react";
import financialUtils from "../utils/financialUtils";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function BudgetModal(prop) {
  // const [userBudget, setUserBudget] = useState(0);
  //const [isChangingBudget, setisChangingBudget] = useState(false);

  const [transactionArr, setTransactionArr] = useState({ transactions: [] });
  const [topArr, setTopArr] = useState({ values: [] });
  useEffect(() => {
    const getRecords = async () => {
      return await fetch("https://banking-app-avion.herokuapp.com/getBudget", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: prop.currentUser._id }),
      })
        .then((data) => data.json())
        .then((jsonData) => setTransactionArr(jsonData));
    };
    const getTopThree = async () => {
      return await fetch(
        "https://banking-app-avion.herokuapp.com/getBudgetChart",
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id: prop.currentUser._id }),
        }
      )
        .then((datathre) => datathre.json())
        .then((jsondatathre) => setTopArr(jsondatathre));
    };
    getTopThree();
    getRecords();
    // const budgetAmount = JSON.parse(
    //   window.localStorage.getItem("budgetAmount")
    // );
    // console.log(budgetAmount);
    //if (budgetAmount !== null) setUserBudget(Number(budgetAmount.amount));
  }, [prop.currentUser]);

  const Records = () => {
    if (transactionArr.transactions === null) return;
    const arr = [];
    let x = 0;
    transactionArr.transactions.forEach((trans) => {
      x++;
      arr.push(
        <tr key={x}>
          <td style={{ maxWidth: "5rem" }} className="center">
            {trans.name}
          </td>
          <td className="center">
            {new Date(Number(trans.date)).toLocaleString().replace(", ", " ")}
          </td>
          <td className={"red-text center"}>
            {financialUtils.numToFinString.format(trans.amount)}
          </td>
        </tr>
      );
    });
    return arr.reverse();
  };

  return (
    <div
      id="budgetModal"
      className="budgetModal modal bottom-sheet"
      style={{
        maxHeight: "90vh",
        height: "fit-content",
        padding: "1rem",
        overflowY: "hidden",
      }}
    >
      <div className="modal-content">
        <div style={{ width: "25%", padding: "1rem" }}>
          <h4>Expenses</h4>
        </div>
        {topArr.values.length >= 3 && (
          <div style={{ maxHeight: "30vh", maxWidth: "100%" }}>
            <Bar
              data={{
                labels: topArr.labels,
                datasets: [
                  {
                    label: "Top 3 Expenses",
                    data: topArr.values,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              height={100}
              width={190}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                  x: {
                    beginAtZero: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        )}
        {/* {!isChangingBudget && (
          <div style={{ width: "25%", padding: "1rem" }}>
            <h4>Monthly Budget: </h4>
            <h4
              style={{ padding: "0 1rem" }}
              onClick={() => {
                setisChangingBudget(true);
              }}
            >
              {financialUtils.numToFinString.format(userBudget)}
            </h4>
          </div>
        )}
        {isChangingBudget && (
          <h4>
            Monthly Budget
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                alignItems: "center",
                gap: "1.2rem",
                width: "25%",
              }}
            >
              <div className="input-field">
                <input
                  type="text"
                  style={{ paddingLeft: "1rem" }}
                  placeholder={userBudget}
                  onChange={(e) => {
                    setUserBudget(e.target.value);
                  }}
                ></input>
              </div>
              <button
                className="btn set-btn blue-grey"
                onClick={() => {
                  setisChangingBudget(false);
                  window.localStorage.setItem(
                    "budgetAmount",
                    JSON.stringify({
                      id: prop.currentUser._id,
                      amount: userBudget.toString(),
                    })
                  );
                }}
              >
                Set
              </button>
            </div>
          </h4>
        )} */}
        <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
          <table>
            <thead>
              <tr>
                <th className="center">Expense</th>
                <th className="center">Date</th>
                <th className="center">Amount</th>
              </tr>
            </thead>
            <tbody>
              <Records />
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-large blue-gray modal-close waves-effect waves-green">
          Done
        </button>
      </div>
    </div>
  );
}
