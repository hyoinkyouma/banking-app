import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import financialUtils from "../utils/financialUtils";
import CustomScroller from "react-custom-scroller";

export default function Userinfo(prop) {
  useEffect(() => {
    let modal = document.querySelector(".modalTransfer");
    M.Modal.init(modal, {});
  }, []);
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
    <div className="col s12 m6 l6">
      <div className="card hoverable z-depth-3 blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">
            {financialUtils.titleCase(prop.currentUser.name)}
          </span>
          <p>{prop.currentUser.accountType}</p>
          <p>{prop.currentUser.accountNumber}</p>
          <p>
            Current Balance:
            {financialUtils.numToFinString.format(prop.currentUser.balance)}
          </p>
        </div>
        <CustomScroller>
          <div className="card-action exchange-rate-options">
            <a href="#depositModal" className="modal-trigger">
              Deposit
            </a>
            <a href="#withdrawModal" className="modal-trigger">
              Withdraw
            </a>
            <a href="#transferModal" className="modal-trigger">
              Transfer
            </a>
            <a href="#billsModal" className="modal-trigger">
              Bills
            </a>
          </div>
        </CustomScroller>
      </div>
    </div>
  );
}
