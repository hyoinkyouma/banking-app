import { useEffect, useState } from "react";
import financialUtils from "../utils/financialUtils";
import CustomScroller from "react-custom-scroller";

export default function TransactionRecords(prop) {
  const [transactionArr, setTransactionArr] = useState({ transactions: [] });

  useEffect(() => {
    const getRecords = async () => {
      return await fetch("http://localhost:3001/getRecords", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: prop.currentUser._id }),
      })
        .then((data) => data.json())
        .then((jsonData) => setTransactionArr(jsonData));
    };
    getRecords();
  }, [prop.currentUser]);

  const Records = () => {
    if (transactionArr.transactions === null) return;
    const arr = [];
    let x = 0;
    transactionArr.transactions.forEach((trans) => {
      x++;
      arr.push(
        <tr key={x}>
          <td className="center">{trans.type}</td>
          <td className="center">
            {new Date(Number(trans.date)).toLocaleString().replace(", ", " ")}
          </td>
          <td
            className={
              trans.type === "Deposited"
                ? "green-text center"
                : "red-text center"
            }
          >
            {financialUtils.numToFinString.format(trans.amount)}
          </td>
        </tr>
      );
    });
    return arr.reverse();
  };

  const clearTransactions = async () => {
    const response = await fetch("http://localhost:3001/delRecords", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: prop.currentUser._id }),
    }).then((data) => {
      const jsonRes = data.json();
      console.log(jsonRes);
      setTransactionArr({ transactions: null });
    });
  };

  return (
    <div id="transactionModal" className="col s12 m6">
      <div className="card hoverable z-depth-3 blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title white-text">Transaction Records</span>
          <div style={{ width: "100%", height: "30vh", overflowY: "scroll" }}>
            <table>
              <thead>
                <tr>
                  <th className="center">Type</th>
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
        <div className="card-action">
          <a href="#" onClick={clearTransactions}>
            Clear
          </a>
        </div>
      </div>
    </div>
  );
}
