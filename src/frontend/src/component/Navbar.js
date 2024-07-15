import React from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBriefcase } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons

const Navbar = () => {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const handlePortfolioClick = () => {
    window.location.href = "http://portfolio.godhanigopal.com";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleHomeClick} title="Home">
        <FontAwesomeIcon
          icon={faHome}
          className="navbar-icon"
          style={{ color: "#000000" }}
        />
        <span className="navbar-text" style={{ color: "#000000" }}>
          Home
        </span>
      </div>
      <div
        className="navbar-logo"
        onClick={handlePortfolioClick}
        title="Portfolio"
      >
        <FontAwesomeIcon
          icon={faBriefcase}
          className="navbar-icon"
          style={{ color: "#000000" }}
        />
        <span className="navbar-text" style={{ color: "#000000" }}>
          Portfolio
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
