const withdraw = async (balance, amount, id, transactionLogging) => {
  const current = await fetch("http://localhost:3001/deposit", {
    method: "POST",
    body: JSON.stringify({ amount: Number(balance) - Number(amount), id: id }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
  console.log(current);
  transactionLogging("Withdrew", balance, amount, current);
  return current;
};

const deposit = async (balance, amount, id, transactionLogging) => {
  const current = await fetch("http://localhost:3001/deposit", {
    method: "POST",
    body: JSON.stringify({ amount: Number(balance) + Number(amount), id: id }),
    headers: { "Content-type": "application/json" },
  }).then((data) => data.json());
  console.log(current);
  transactionLogging("Deposited", balance, amount, current);
  return current;
};

const transactionLogging = (transType, balance, amount, current) => {
  console.log(
    `${transType} ${amount}. Previous balance ${balance}. Now ${current}`
  );
};

export { withdraw, deposit, transactionLogging };
