import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../redux/actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredentials from "./ProfileCredentials";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/spinner/Spinner";

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // redirect if profile is null
    if (
      prevProps.profile.loading &&
      prevProps.profile.profile === null &&
      (this.props.profile.profile === null &&
        this.props.profile.loading === false)
    ) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profile === null || loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-6">
                      <Link
                        to="/profiles"
                        className="btn btn-light mb-3 float-left"
                      >
                        Back To Profiles
                      </Link>
                    </div>
                    <div className="col-md-6" />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <ProfileHeader profile={profile} />
                      <ProfileAbout profile={profile} />
                      <ProfileCredentials
                        experience={profile.experience}
                        education={profile.education}
                      />
                      {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} />
                      ) : (
                        <p className="text-center">No Github Listed</p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
