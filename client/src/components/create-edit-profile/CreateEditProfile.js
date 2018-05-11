import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile
} from "../../redux/actions/profileActions";
import updateForm from "../../utils/updateFormWithProfile";
import ProfileForm from "./ProfileForm";

class CreateEditProfile extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.errors !== nextProps.errors) {
      return { errors: nextProps.errors };
    }

    if (
      nextProps.profile.profile &&
      nextProps.history.location.pathname !== "/create-profile"
    ) {
      const { profile } = nextProps.profile;
      // if profile exists then update the form fields (state)
      // with current profile's data
      return updateForm(profile);
    }

    return null;
  };

  componentDidMount() {
    if (Object.keys(this.props.profile).length > 0) {
      this.props.getCurrentProfile();
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    // call redux action
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleSocialInputs = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  render() {
    return (
      <ProfileForm
        {...this.props}
        state={this.state}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        toggleSocialInputs={this.toggleSocialInputs}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateEditProfile)
);
