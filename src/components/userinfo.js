import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import financialUtils from "../utils/financialUtils";

export default function Userinfo(prop) {
  useEffect(() => {
    let modal = document.querySelector(".modalDeposit");
    M.Modal.init(modal, {});
  }, []);

  useEffect(() => {
    let modal = document.querySelector(".modalWithdraw");
    M.Modal.init(modal, {});
  }, []);
  useEffect(() => {
    let modal = document.querySelector(".modalBills");
    M.Modal.init(modal, {});
  }, []);

  return (
    <div className="row ">
      <div className="col s12 m6">
        <div className="card hoverable z-depth-3 blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{prop.currentUser.name}</span>
            <p>{prop.currentUser.accountType}</p>
            <p>{prop.currentUser.accountNumber}</p>
            <p>
              Current Balance:{" "}
              {financialUtils.numToFinString.format(prop.currentUser.balance)}
            </p>
          </div>
          <div className="card-action">
            <a href="#depositModal" className="modal-trigger">
              Deposit
            </a>
            <a href="#withdrawModal" className="modal-trigger">
              Withdraw
            </a>
            <a href="#billsModal" className="modal-trigger">
              Bills Payment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
