import M from "materialize-css/dist/js/materialize.min.js";
import financialUtils from "./financialUtils";

const withdraw = async (balance, amount, id, transactionLogging) => {
  const current = await fetch("http://localhost:3001/deposit", {
    method: "POST",
    body: JSON.stringify({ amount: Number(balance) - Number(amount), id: id }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
  transactionLogging("Withdrew", balance, amount, current.balance);
  return current;
};

const deposit = async (balance, amount, id, transactionLogging) => {
  const current = await fetch("http://localhost:3001/deposit", {
    method: "POST",
    body: JSON.stringify({ amount: Number(balance) + Number(amount), id: id }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
  transactionLogging("Deposited", balance, amount, current.balance);
  return current;
};

const billsPayment = async (msg, balance, amount, id, transactionLogging) => {
  const current = await fetch("http://localhost:3001/deposit", {
    method: "POST",
    body: JSON.stringify({ amount: Number(balance) - Number(amount), id: id }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
  transactionLogging(msg, balance, amount, current.balance);
  return current;
};

const transactionLogging = (transType, balance, amount, current) => {
  console.log(
    `${transType} ${amount}. Previous balance ${balance}. Now ${current}`
  );
  M.toast({
    html: `${transType} ${financialUtils.numToFinString.format(amount)}.`,
  });
};

export { withdraw, deposit, billsPayment, transactionLogging };
