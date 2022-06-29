import Nav from "./components/nav";
import Userinfo from "./components/userinfo";
import DepositModal from "./components/depositModal";
import WithdrawModal from "./components/withdrawModal";
import { useState, useEffect } from "react";
import "./style.css";
import LoginScreen from "./components/loginscreen";
import loginById from "./utils/loginById";
import ExchangeRates from "./components/ExchangeRates";
import BillsModal from "./components/billsPaymentModal";
import TransactionRecords from "./components/TransactionRecords";

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

  useEffect(() => {
    if (window.localStorage.getItem("currentUser")) {
      const login = async () => {
        return await loginById(
          window.localStorage.getItem("currentUser"),
          (data) => {
            setCurrentUser(data);
            setLogin(true);
          }
        );
      };
      login();
    }
  }, []);

  if (isLoggedIn === true) {
    return (
      <>
        <Nav
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          setUserId={setUserId}
          currentUser={currentUser}
          showLogout={true}
        />
        <Userinfo currentUser={currentUser} />
        <ExchangeRates />
        <TransactionRecords currentUser={currentUser} />
        <DepositModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <WithdrawModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <BillsModal currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
          currentUser={currentUser}
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
