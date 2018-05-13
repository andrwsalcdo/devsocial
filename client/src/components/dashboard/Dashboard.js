import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../redux/actions/profileActions";
import Spinner from "../common/spinner/Spinner";
import ProfileEdits from "./ProfileEdits";
import Table from "./Table";

class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount();
  };

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
                <div>
                  <p className="lead text-muted">
                    Welcome{" "}
                    <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                  </p>
                  <ProfileEdits />
                  {profile.experience.length > 0 && (
                    <Table
                      header="Experience Credentials"
                      th1="Company"
                      th2="Title"
                      data={profile.experience}
                      experience={true}
                    />
                  )}
                  {profile.education.length > 0 && (
                    <Table
                      header="Education Credentials"
                      th1="School"
                      th2="Degree"
                      data={profile.education}
                      education={true}
                    />
                  )}
                  <button
                    onClick={this.handleDeleteAccount}
                    className="btn btn-danger"
                  >
                    Delete My Account
                  </button>
                </div>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
