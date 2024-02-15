import "./Header.scss";

import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/cellarhand_logo.svg";
import profile from "../../assets/images/cellarhand_profile.png";

function Header() {

  return (
    <header className="header">
      <section className="header__container">
        <Link to={`/`} className="header__link">
        <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <div className="header__box">
          <img className="header__profile" src={profile} alt="Profile" />
          <p className="header__account">account</p>
          <p className="header__logout">logout</p>
        </div>
        <nav className="header__nav">
          <ul className="header__list">
            <Link to={`/fruit-intake`} className="header__link">
            <li>
              <p className="header__links">fruit intake</p>
            </li>
            </Link>
            <Link to={`/crush-order`} className="header__link">
            <li>
              <p className="header__links">crush order</p>
            </li>
            </Link>
            <Link to={`/lab-analysis`} className="header__link">
            <li>
              <p className="header__links">lab analysis</p>
            </li>
            </Link>
            <Link to={`/additives`} className="header__link">
            <li>
              <p className="header__links">additives</p>
            </li>
            </Link>
            <Link to={`/racking`} className="header__link">
            <li>
              <p className="header__links">racking</p>
            </li>
            </Link>
            <Link to={`/bottling`} className="header__link">
            <li>
              <p className="header__links">bottling</p>
            </li>
            </Link>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
