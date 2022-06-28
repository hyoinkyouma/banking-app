import Nav from "./components/nav";
import Userinfo from "./components/userinfo";
import DepositModal from "./components/depositModal";
import WithdrawModal from "./components/withdrawModal";
import { useState, useEffect } from "react";
import "./style.css";
import LoginScreen from "./components/loginscreen";
import ExchangeRates from "./components/ExchangeRates";

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [userId, setUserId] = useState(1);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
    balance: 0,
    accountNumber: "",
    accountType: "",
    accountId: 0,
    __v: 0,
  });

  if (isLoggedIn === true) {
    return (
      <>
        <Nav
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          setUserId={setUserId}
          showLogout={true}
        />
        <Userinfo currentUser={currentUser} />
        <ExchangeRates />
        <DepositModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <WithdrawModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </>
    );
  } else {
    return (
      <>
        <Nav
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          setUserId={setUserId}
          showLogout={false}
        />
        <LoginScreen
          setLogin={setLogin}
          setCurrentUser={setCurrentUser}
          setUserId={setUserId}
        />
      </>
    );
  }
}

export default App;
