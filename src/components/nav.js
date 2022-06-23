import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

export default function Nav() {
  useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);

  const marginRight = { marginRight: "1rem" };
  return (
    <>
      <nav>
        <div className="nav-wrapper blue-grey darken-3">
          <a
            href="#"
            className="brand-logo left hide-on-med-and-down"
            style={{ marginLeft: "1rem" }}
          >
            Logo dito
          </a>
          <a href="#!" className="brand-logo center">
            Di pako sure ano name
          </a>
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <div
            id="nav-mobile"
            className="right hide-on-med-and-down center-align"
            style={marginRight}
          >
            <button className="btn" style={marginRight}>
              Settings
            </button>
            <button className="btn">About</button>
          </div>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </>
  );
}
