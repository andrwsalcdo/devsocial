import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import selectOptions from "../../utils/selectOptions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputIconGroup from "../common/InputIconGroup";

class CreateProfile extends Component {
  static propTypes = {
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

    console.log(profileData);
    // todo: call redux action
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
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some info to make your profile stand out{" "}
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  smallInfo="A unique handle for your profile URL"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="Status"
                  value={this.state.status}
                  onChange={this.onChange}
                  // selectOptions imported
                  options={selectOptions}
                  error={errors.status}
                  smallInfo="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  smallInfo="Your company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  smallInfo="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  smallInfo="City or city & state suggested (eg. Tampa Bay, FL)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  smallInfo="Please use comma separated values (eg. HTML, CSS, JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  smallInfo="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  smallInfo="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.toggleSocialInputs}
                    className="btn btn-light"
                  >
                    Add Social Media Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {/* if toggled then display the social media inputs */}
                {this.state.displaySocialInputs && (
                  <div>
                    <InputIconGroup
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      icon="fab fa-twitter"
                      value={this.state.twitter}
                      onChange={this.onChange}
                      error={errors.twitter}
                      autoComplete="url"
                    />
                    <InputIconGroup
                      placeholder="Facebook Page URL"
                      name="facebook"
                      icon="fab fa-facebook"
                      value={this.state.facebook}
                      onChange={this.onChange}
                      error={errors.facebook}
                      autoComplete="url"
                    />
                    <InputIconGroup
                      placeholder="Linkedin Profile URL"
                      name="linkedin"
                      icon="fab fa-linkedin"
                      value={this.state.linkedin}
                      onChange={this.onChange}
                      error={errors.linkedin}
                      autoComplete="url"
                    />
                    <InputIconGroup
                      placeholder="YouTube Channel URL"
                      name="youtube"
                      icon="fab fa-youtube"
                      value={this.state.youtube}
                      onChange={this.onChange}
                      error={errors.youtube}
                      autoComplete="url"
                    />
                    <InputIconGroup
                      placeholder="Instagram Page URL"
                      name="instagram"
                      icon="fab fa-instagram"
                      value={this.state.instagram}
                      onChange={this.onChange}
                      error={errors.instagram}
                      autoComplete="url"
                    />
                  </div>
                )}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
// add redux action
export default connect(mapStateToProps)(CreateProfile);
