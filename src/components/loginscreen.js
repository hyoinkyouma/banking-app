import { useState } from "react";
import login from "../utils/loginByCreds";

function LoginScreen(prop) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isIncorrectPass, setIsIncorrectPass] = useState(false);
  const [isIncorrectEmail, setIsIncorrectEmail] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleInputPass = (event) => {
    setInputPassword(event.target.value);
    setIsIncorrectPass(false);
    setIsIncorrectEmail(false);
  };
  const handleInputEmail = (event) => {
    setInputEmail(event.target.value);
    setIsIncorrectPass(false);
    setIsIncorrectEmail(false);
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await login(inputEmail, inputPassword).then((data) => {
      setIsLoggingIn(false);
      if (data === "Incorrect Password") return setIsIncorrectPass(true);
      if (data === "Incorrect Email") return setIsIncorrectEmail(true);
      prop.setCurrentUser(data);
      prop.setLogin(true);
      window.localStorage.setItem("currentUser", data._id);
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
      <div
        className="container nav-container "
        style={{
          height: "100vh",
          display: "grid",
          gridAutoFlow: "column",
          alignItems: "center",
        }}
      >
        <div className="row">
          <div className="col s12 m6 l4 offset-m3 offset-l4">
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
                    {isLoggingIn && (
                      <div class="progress">
                        <div class="indeterminate"></div>
                      </div>
                    )}
                    {isIncorrectEmail
                      ? `Email is incorrect or does not exist`
                      : ""}
                    {isIncorrectPass ? `Password is incorrect` : ""}
                  </p>
                  <br />
                  <button
                    className="btn btn-login  waves-effect blue-grey darken-1 waves-dark"
                    onClick={handleLogin}
                    style={{ marginBottom: "1rem", width: "8rem" }}
                  >
                    Login
                  </button>
                  <br />
                  <button
                    style={{ width: "8rem" }}
                    className="btn btn-register  waves-effect blue-grey darken-1 waves-dark"
                    onClick={() => {
                      window.location.replace(
                        "https://banking-app-avion.herokuapp.com/newUser"
                      );
                    }}
                  >
                    Register
                  </button>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
