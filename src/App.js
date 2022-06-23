import Nav from "./components/nav";
import Userinfo from "./components/userinfo";
import DepositModal from "./components/depositModal";
import WithdrawModal from "./components/withdrawModal";
import { useState } from "react";
import financialUtils from "./utils/financialUtils";
import "./style.css";
import LoginScreen from "./components/loginscreen";

function App() {
  const [balance, setStateBalance] = useState(56000);
  const [isLoggedIn, setLogin] = useState(false);

  const user = {
    name: "Roman Cabalum",
    status: "Active Account",
    balance: balance,
  };

  const registeredUsers = [
    { email: "roman.cabalum@gmail.com", password: "1234" },
  ];

  if (isLoggedIn === true) {
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
  } else {
    return (
      <>
        <Nav />
        <LoginScreen setLogin={setLogin} registeredUsers={registeredUsers} />
      </>
    );
  }
}

export default App;
