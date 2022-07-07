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
import News from "./components/news";
import { Budget } from "./components/Budget";
import TransferModal from "./components/Transfer";
import BudgetModal from "./components/BudgetModal";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setLogin] = useState(false);
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
    const params = new URL(document.location).searchParams;
    const idParams = params.get("Acc");
    if (idParams !== null) {
      const login = async () => {
        return await loginById(idParams, (data) => {
          window.localStorage.setItem("currentUser", data._id);
          setCurrentUser(data);
          setLogin(true);
          window.history.pushState(
            "object or string",
            "Title",
            "/" +
              window.location.href
                .substring(window.location.href.lastIndexOf("/") + 1)
                .split("?")[0]
          );
        });
      };
      login();
    } else if (window.localStorage.getItem("currentUser")) {
      const login = async () => {
        setLogin(true);

        return await loginById(
          window.localStorage.getItem("currentUser"),
          (data) => {
            setCurrentUser(data);
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
          currentUser={currentUser}
          showLogout={true}
        />
        <div className="main-container">
          <div>
            <Userinfo currentUser={currentUser} />
            <ExchangeRates />
            <TransactionRecords currentUser={currentUser} />
          </div>
          <div>
            <News />

            <Budget currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </div>
        <DepositModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <WithdrawModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <BillsModal currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <TransferModal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <BudgetModal currentUser={currentUser} />
        <Footer />
      </>
    );
  } else {
    return (
      <div
        className="login-main"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Nav
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
          showLogout={false}
          currentUser={currentUser}
        />
        <LoginScreen setLogin={setLogin} setCurrentUser={setCurrentUser} />
        <Footer posY={"absolute"} />
      </div>
    );
  }
}

export default App;
