import { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
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

  useEffect(() => {
    let modal = document.getElementById("clearModal");
    M.Modal.init(modal, {});
  }, []);

  const Records = () => {
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

  return (
    <div className="col s12 m6">
      <div className="card hoverable z-depth-3 blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title white-text">Transaction Records</span>
          <CustomScroller>
            <div style={{ width: "100%", height: "30vh" }}>
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
          </CustomScroller>
        </div>
        <div className="card-action">
          <a href="#clearModal" className="modal-trigger">
            Clear
          </a>
        </div>
      </div>
    </div>
  );
}
