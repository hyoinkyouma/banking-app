import Nav from "./components/nav";
import Userinfo from "./components/userinfo";
import DepositModal from "./components/depositModal";
import WithdrawModal from "./components/withdrawModal";
import { useState } from "react";
import financialUtils from "./utils/financialUtils";
import "./style.css";
import LoginScreen from "./components/loginscreen";

function App() {
  const [balance, setStateBalance] = useState(0);
  const [isLoggedIn, setLogin] = useState(false);
  const [userId, setUserId] = useState(1);

  const user = [
    {
      name: "Roman Cabalum",
      status: "Active Account",
      balance: 57000,
    },
    {
      name: "Piolo Pascual",
      status: "Active Account",
      balance: 10000000000,
    },
  ];

  const registeredUsers = [
    { email: "roman.cabalum@gmail.com", password: "1234", id: 0 },
    { email: "papaP@gmail.com", password: "1234", id: 1 },
  ];

  if (isLoggedIn === true) {
    return (
      <>
        <Nav />
        <Userinfo
          name={user[userId].name}
          status={user[userId].status}
          balanceStr={financialUtils.numToFinString.format(balance)}
          balance={balance}
          setBalance={setStateBalance}
        />
        <DepositModal
          balance={balance}
          balanceStr={financialUtils.numToFinString.format(balance)}
          setBalance={setStateBalance}
        />
        <WithdrawModal
          balance={balance}
          balanceStr={financialUtils.numToFinString.format(balance)}
          setBalance={setStateBalance}
        />
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <LoginScreen
          setLogin={setLogin}
          registeredUsers={registeredUsers}
          setUserId={setUserId}
          regUser={user}
          setBalance={setStateBalance}
        />
      </>
    );
  }
}

export default App;
