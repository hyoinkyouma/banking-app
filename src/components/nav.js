import React from "react";
import { useState } from "react";

export default function Nav() {
  const btnStyle = { display: "flex", gap: "1rem" };
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo center">
            Di pako sure ano name
          </a>
          <a href="#" datatarget="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down" style={{ btnStyle }}>
            <li>
              <button className="btn">Settings</button>
            </li>
            <li>
              <button className="btn">About</button>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" style={{ display: "none" }}>
        <li>
          <button>Settings</button>
        </li>
        <li>
          <button>Components</button>
        </li>
      </ul>
    </>
  );
}
