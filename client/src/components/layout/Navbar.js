import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { AuthLinks, GuestLinks } from "./NavLinks";

class Navbar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  handleLogoutUser = e => {
    e.preventDefault();
    // call redux action
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevSocial
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <AuthLinks
                onClick={this.handleLogoutUser}
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <GuestLinks />
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
