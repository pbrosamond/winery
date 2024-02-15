import "./Header.scss";
import React from "react";

import logo from "../../assets/images/cellarhand_logo.svg";
import profile from "../../assets/images/cellarhand_profile.png";

function Header() {
  return (
    <header className="header">
      <section className="header__container">
        <img className="header__logo" src={logo} alt="Logo" />
        <div className="header__box1">
          <img className="header__profile" src={profile} alt="Profile" />
          <p className="header__account">account</p>
          <p className="header__logout">logout</p>
        </div>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__active">
              <p className="header__links">fruit intake</p>
            </li>
            <li>
              <p className="header__links">crush order</p>
            </li>
            <li>
              <p className="header__links">lab analysis</p>
            </li>
            <li>
              <p className="header__links">additives</p>
            </li>
            <li>
              <p className="header__links">racking</p>
            </li>
            <li>
              <p className="header__links">bottling</p>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
