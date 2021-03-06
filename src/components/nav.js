import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import navBackground from "./pexels-pixabay-534216.jpg";

export default function Nav(props) {
  useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);

  const logout = () => {
    props.setLogin(false);
    window.localStorage.clear();
  };

  const marginRight = { marginRight: "1rem" };
  return (
    <>
      <nav>
        <div className="nav-wrapper blue-grey darken-3">
          <a
            href="#"
            className="brand-logo left hide-on-med-and-down"
            style={{ marginLeft: "1rem" }}
          ></a>
          <a href="#!" className="brand-logo center">
            Bank-App
          </a>
          <a
            href="#"
            data-target="slide-out"
            className={props.isLoggedIn === true ? "sidenav-trigger" : "hide"}
          >
            <i className="material-icons">menu</i>
          </a>

          <div
            id="nav-mobile"
            className="right hide-on-med-and-down center-align"
            style={marginRight}
          >
            <button
              className={
                props.isLoggedIn === true
                  ? "btn red light-3 waves-effect scale-out scale-transition scale-in"
                  : "btn red light-3 waves-effect scale-out scale-transition"
              }
              onClick={logout}
              style={marginRight}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src={navBackground} />
            </div>
            <a href="#name">
              <span className="white-text name">{props.currentUser.name}</span>
            </a>
            <a href="#email">
              <span className="white-text email">
                {props.currentUser.email}
              </span>
            </a>
          </div>
        </li>
        <li>
          <a
            href="#"
            style={{
              display: props.showLogout === true ? "" : "none",
            }}
            onClick={logout}
            className="sidenav-close"
          >
            Logout
          </a>
        </li>
      </ul>
    </>
  );
}
