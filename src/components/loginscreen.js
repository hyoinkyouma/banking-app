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
    const { email, password } = prop.registeredUsers[0];
    if (email === inputEmail && password === inputPassword) {
      prop.setLogin(true);
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
                />
              </div>
              <br />
              <div className="html-field center">
                <button
                  className="btn-large waves-effect blue-grey darken-1 waves-dark"
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
