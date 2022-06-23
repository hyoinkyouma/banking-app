import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

export default function Userinfo(prop) {
  useEffect(() => {
    let modal = document.querySelector(".modalDeposit");
    M.Modal.init(modal, {});
  }, []);

  useEffect(() => {
    let modal = document.querySelector(".modalWithdraw");
    M.Modal.init(modal, {});
  }, []);

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{prop.name}</span>
            <p>{prop.status}</p>
            <p style={{ marginBottom: "10px" }}>
              Current Balance: {prop.balanceStr}
            </p>
          </div>
          <div className="card-action">
            <a href="#depositModal" className="modal-trigger">
              Deposit
            </a>
            <a href="#withdrawModal" className="modal-trigger">
              Withdraw
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
