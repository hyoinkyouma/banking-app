import { useState } from "react";

function LoginScreen(prop) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleInputPass = (event) => {
    setInputPassword(event.target.value);
  };
  const handleInputEmail = (event) => {
    setInputEmail(event.target.value);
  };

  const handleLogin = () => {
    prop.registeredUsers.forEach((user) => {
      if (user.email === inputEmail && user.password === inputPassword) {
        prop.setUserId(user.id);
        prop.setBalance(prop.regUser[user.id].balance);
        prop.setLogin(true);
        console.log(prop.regUser[user.id].balance);
      }
    });
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
        <div className="col s12 m8 l4 offset-m2 offset-l4">
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
                <button
                  className="btn btn-login waves-effect blue-grey darken-1 waves-dark"
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
