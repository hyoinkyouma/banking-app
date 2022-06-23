const withdraw = (balance, amount, transactionLogging) => {
  const current = balance - amount;
  transactionLogging("Withdrew", balance, amount, current);
  return current;
};

const deposit = (balance, amount, transactionLogging) => {
  const current = balance + amount;
  transactionLogging("Deposited", balance, amount, current);
  return current;
};

const transactionLogging = (transType, balance, amount, current) => {
  console.log(
    `${transType} ${amount}. Previous balance ${balance}. Now ${current}`
  );
};

export { withdraw, deposit, transactionLogging };
