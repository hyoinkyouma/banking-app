import React, { useState, useEffect, useRef } from "react";
import financialUtils from "../utils/financialUtils";
import { transactionLogging, transfer } from "../utils/changeBalance";

function TransferModal(prop) {
  const recepientRef = useRef();
  const [amount, setAmount] = useState("");
  const [accNumInput, setAccNumInput] = useState("");
  const [inputIsHidden, setInputIsHidden] = useState(true);

  useEffect(() => {
    //timeout : .5secs
    const debounceFun = setTimeout(async () => {
      if (recepientRef.current !== undefined) return;
      if (accNumInput === "") return;
      //fetch to ref
      await fetch("https://banking-app-avion.herokuapp.com/findUserAccNum", {
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
    }, 1000);
    return () => clearTimeout(debounceFun);
  }, [accNumInput]);

  const transferSubmit = async () => {
    const senderMsg = `Sent to ${recepientRef.current.name}`;
    const recMsg = `From ${prop.currentUser.name}`;
    const balance = prop.currentUser.balance;
    const id = prop.currentUser._id;
    const recId = recepientRef.current._id;
    const senderName = prop.currentUser.name;

    const res = await transfer(
      senderMsg,
      recMsg,
      balance,
      amount,
      id,
      recId,
      transactionLogging,
      senderName
    );
    prop.setCurrentUser(res);
    setAmount("");
    setInputIsHidden(true);
    setAccNumInput("");
  };
  return (
    <div
      id="transferModal"
      className="modal modalTransfer"
      style={{ gap: "1rem", display: "none", flexDirection: "column" }}
    >
      <div className="modal-content">
        <h4 className="h1">Transfer</h4>
        <h5>
          Balance:{" "}
          {financialUtils.numToFinString.format(
            prop.currentUser.balance - Number(amount.replace(",", ""))
          )}
        </h5>
        <div className="input-field col s6" style={{ marginTop: "2rem" }}>
          <input
            id="recipientId"
            type="text"
            value={accNumInput}
            className="validate"
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                e.target.value.charAt(e.target.value.length - 1) === "-"
              ) {
                setAccNumInput(
                  e.target.value.substring(0, e.target.value.length - 1)
                );
              }
            }}
            onChange={(e) => {
              if (!e.target.value.match("^[0-9\x08-]*$")) return;
              recepientRef.current = undefined;
              setInputIsHidden(true);
              setAccNumInput(
                e.target.value
                  .replace(/[^\dA-Z]/g, "")
                  .replace(/(.{4})/g, "$1-")
                  .trim()
              );
              if (e.target.value.length > 17)
                setAccNumInput(e.target.value.substring(0, 19));
            }}
          />
          <label htmlFor="recipientId">
            {inputIsHidden ? "Recipient Acc. Number" : "Recipient Name"}
          </label>
        </div>
        <div
          className={
            inputIsHidden
              ? "input-field col s6 scale-transition scale-out"
              : "input-field col s6 scale-transition scale-in"
          }
        >
          <input
            id="accNum"
            type="text"
            readOnly
            value={
              recepientRef.current === undefined
                ? ""
                : recepientRef.current.accountNumber
            }
            className="validate active"
          />
          <label className="active">Account Number</label>
        </div>

        <div
          className={
            inputIsHidden
              ? "input-field col s6 scale-transition scale-out"
              : "input-field col s6 scale-transition scale-in"
          }
        >
          <input
            id="amount"
            type="text"
            value={amount}
            className="validate"
            onChange={(e) => {
              if (e.target.value.match("^[0-9,]*$")) {
                setAmount(e.target.value);
              }
            }}
          />
          <label htmlFor="amount">Amount</label>
        </div>

        <button
          disabled={inputIsHidden}
          onClick={transferSubmit}
          className="btn modal-close deposit-modal "
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TransferModal;
