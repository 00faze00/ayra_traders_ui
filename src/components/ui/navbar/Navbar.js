import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// import css here

import "./Navbar.css";

const Navbar = () => {
  let navigate = useLocation();
  const [navbarToggle, setNavbarToggle] = useState(false);

  const navbarToggleHandler = () => {
    setNavbarToggle(!navbarToggle);
  };

  const navOptionHandler = () => {
    setNavbarToggle(false);
  };

  const navClickHandler = (curr) => {
    if (navigate.pathname === curr ) {
      return '#fff';
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container__holder container">
        <div className="navbar-logo">
          <Link to="/">
            <p>AYRA TRADERS</p>
          </Link>
        </div>
        <div className={"hamburger-lines " + (navbarToggle ? 'clicked' : '')} onClick={navbarToggleHandler} >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <div className="navbar-options">
          <ul>
            <li onClick={navOptionHandler} >
              <Link to="/" style={{ color : navClickHandler('/') }} > Home </Link>
            </li>
            <li onClick={navOptionHandler}>
              <Link to="/customers" style={{ color : navClickHandler('/customers') }} > Customers </Link>
            </li>
            <li onClick={navOptionHandler}>
              <Link to="/gifts" style={{ color : navClickHandler('/gifts') }} > Gifts </Link>
            </li>
            <li onClick={navOptionHandler}>
              <Link to="#" style={{ color : navClickHandler('/login') }} > Sign In </Link>
            </li>
            {/* <li><Link to="#" /></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
