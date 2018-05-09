import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import Spinner from "../common/spinner/Spinner";

class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {profile === null || loading ? (
                <Spinner />
              ) : // check if the logged in user has profile data
              Object.keys(profile).length > 0 ? (
                // TODO: add profile data
                <h1>user profile data</h1>
              ) : (
                // user is logged in, but doesn't have a profile
                <div>
                  <p className="lead text-muted">Welcome {user.name} </p>
                  <p>You have not setup a profile, please add some info</p>
                  <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
