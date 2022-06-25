import { useState } from "react";

function LoginScreen(prop) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleInputPass = (event) => {
    setInputPassword(event.target.value);
    setIsIncorrect(false);
  };
  const handleInputEmail = (event) => {
    setInputEmail(event.target.value);
    setIsIncorrect(false);
  };

  const handleLogin = () => {
    prop.registeredUsers.forEach((user) => {
      if (user.email === inputEmail && user.password === inputPassword) {
        prop.setUserId(user.id);
        saveUser(user.id);
        prop.setBalance(prop.regUser[user.id].balance);
        prop.setLogin(true);
        console.log(prop.regUser[user.id].balance);
      } else {
        setIsIncorrect(true);
      }
    });
  };

  const saveUser = (user) => {
    window.localStorage.setItem("currentUser", user);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const btn = document.querySelector(".btn-login");
      btn.click();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col s12 m6 l4 offset-m2 offset-l4">
          <div className="card">
            <div className="card-action center blue-grey darken-1 white-text">
              <h3>Login</h3>
            </div>
            <div className="card-content">
              <div className="htmlForm-field">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  id="username"
                  value={inputEmail}
                  onChange={handleInputEmail}
                  onKeyDown={handleEnter}
                />
              </div>
              <br />
              <div className="htmlForm-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={inputPassword}
                  onChange={handleInputPass}
                  onKeyDown={handleEnter}
                />
              </div>
              <br />
              <div className="html-field center">
                <p className="red-text">
                  {isIncorrect ? `Email or password is incorrect` : ""}
                </p>
                <br />
                <button
                  className="btn btn-login btn-large waves-effect blue-grey darken-1 waves-dark"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
