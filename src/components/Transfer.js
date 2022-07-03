import { useState, useEffect, useRef } from "react";
import financialUtils from "../utils/financialUtils";
import M from "materialize-css/dist/js/materialize.min.js";

function TransferModal(prop) {
  const recepientRef = useRef();
  const [amount, setAmout] = useState(0);
  const [accNumInput, setAccNumInput] = useState("");
  const [inputIsHidden, setInputIsHidden] = useState(true);

  useEffect(() => {
    //timeout on local: .5secs
    const debounceFun: void = setTimeout(async () => {
      if (recepientRef.current !== undefined) return;
      if (accNumInput === "") return;
      //fetch
      const recepient = await fetch("http://localhost:3001/findUserAccNum", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: accNumInput }),
      })
        .then((res) => res.json())
        .then((resjson) => {
          if (resjson === undefined || resjson === null) return;

          recepientRef.current = resjson;
          setAccNumInput(`${financialUtils.titleCase(resjson.name)}`);
          setInputIsHidden(false);
        });
    }, 500);
  }, [accNumInput]);

  const changeBalanceDeposit = async () => {};
  return (
    <div
      id="transferModal"
      className="modal modalTransfer"
      style={{ gap: "1rem", display: "none", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Transfer</h4>
        <h5>
          Balance:
          {financialUtils.numToFinString.format(
            prop.currentUser.balance - Number(amount)
          )}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="recipientId"
            type="text"
            value={accNumInput}
            className="validate"
            onChange={(e) => {
              setInputIsHidden(true);
              recepientRef.current = undefined;
              setAccNumInput(e.target.value);
            }}
          />
          <label htmlFor="recipientId">Recipient Acc. Number</label>
        </div>
        <div
          className={
            inputIsHidden
              ? "input-field col s6 scale-transition scale-out"
              : "input-field col s6 scale-transition scale-in"
          }
        >
          <input
            id="recipientId"
            type="text"
            value={
              recepientRef.current === undefined
                ? ""
                : recepientRef.current.accountNumber
            }
            className="validate"
            onChange={(e) => {
              recepientRef.current = undefined;
              setAccNumInput(e.target.value);
            }}
          />
        </div>

        <button className="btn modal-close center deposit-modal waves-effect waves-green">
          Submit
        </button>
      </div>
    </div>
  );
}

export default TransferModal;
