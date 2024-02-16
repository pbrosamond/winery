import "./Header.scss";

import React from "react";
import { Link, useLocation } from "react-router-dom";


import logo from "../../assets/images/cellarhand_logo.svg";
import profile from "../../assets/images/cellarhand_profile.png";

function Header() {

  const location = useLocation();

  return (
    <header className="header">
      <section className="header__container">
        <Link to={`/`} className="header__link">
        <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <div className="header__box">
          <img className="header__profile" src={profile} alt="Profile" />
          <h2 className="header__account">account</h2>
          <h2 className="header__logout">logout</h2>
        </div>
        <nav className="header__nav">
          <ul className="header__list">
            <li>
              <Link to={`/fruit-intake`} className={"header__link" + (location.pathname === "/fruit-intake" ? "--active" : "")}>
                fruit intake
              </Link>
            </li>
            <li>
              <Link to={`/crush-order`} className={"header__link" + (location.pathname === "/crush-order" ? "--active" : "")}>
                crush order
              </Link>
            </li>
            <li>
              <Link to={`/lab-analysis`} className={"header__link" + (location.pathname === "/lab-analysis" ? "--active" : "")}>
                lab analysis
              </Link>
            </li>
            <li>
              <Link to={`/additives`} className={"header__link" + (location.pathname === "/additives" ? "--active" : "")}>
                additives
              </Link>
            </li>
            <li>
              <Link to={`/racking`} className={"header__link" + (location.pathname === "/racking" ? "--active" : "")}>
                racking
              </Link>
            </li>
            <li>
              <Link to={`/bottling`} className={"header__link" + (location.pathname === "/bottling" ? "--active" : "")}>
                bottling
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
