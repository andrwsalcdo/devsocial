import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthLinks = ({ onClick, src, alt }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/feed">
        Post Feed
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/dashboard">
        Dashboard
      </Link>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/" onClick={onClick}>
        <img
          src={src}
          alt={alt}
          className="rounded-circle"
          style={{ width: "25px", marginRight: "5px" }}
          title="You must have a Gravatar conneced to your email to display an image"
        />
        Logout
      </a>
    </li>
  </ul>
);

AuthLinks.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

const GuestLinks = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/register">
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </li>
  </ul>
);

export { AuthLinks, GuestLinks };
