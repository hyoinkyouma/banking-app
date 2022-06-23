import Nav from "./components/nav";
import Userinfo from "./components/userinfo";
import DepositModal from "./components/depositModal";
import WithdrawModal from "./components/withdrawModal";
import { useState } from "react";
import financialUtils from "./utils/financialUtils";
import "./style.css";

function App() {
  const [balance, setStateBalance] = useState(56000);

  const user = {
    name: "Roman Cabalum",
    status: "Active Account",
    balance: balance,
  };

  return (
    <>
      <Nav />
      <Userinfo
        name={user.name}
        status={user.status}
        balanceStr={financialUtils.numToFinString.format(user.balance)}
        balance={balance}
        setBalance={setStateBalance}
      />
      <DepositModal
        balance={balance}
        balanceStr={financialUtils.numToFinString.format(user.balance)}
        setBalance={setStateBalance}
      />
      <WithdrawModal
        balance={balance}
        balanceStr={financialUtils.numToFinString.format(user.balance)}
        setBalance={setStateBalance}
      />
    </>
  );
}

export default App;
