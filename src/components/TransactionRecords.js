import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import financialUtils from "../utils/financialUtils";

const MakeRecords = () => {
  const elem = [];

  const gs = [
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
    { Type: "Alvin", Date: "Eclair", Amount: "$0.87" },
  ];

  gs.forEach((g) => {
    elem.push(
      <tr>
        <td>{g.Type}</td>
        <td>{g.Date}</td>
        <td>{g.Amount}</td>
      </tr>
    );
  });

  return elem;
};
export default function TransactionRecords(prop) {
  useEffect(() => {
    let modal = document.getElementById("clearModal");
    M.Modal.init(modal, {});
  }, []);

  return (
    <div className="row ">
      <div className="col s12 m6">
        <div className="card hoverable z-depth-3 blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title white-text">Transaction Records</span>

            <div style={{ overflowY: "scroll", height: "30vh" }}>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <MakeRecords />
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-action">
            <a href="#clearModal" className="modal-trigger">
              Clear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
