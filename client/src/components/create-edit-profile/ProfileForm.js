import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CreateProfileHeader, EditProfileHeader } from "./ProfileHeaders";
import selectOptions from "../../utils/selectOptions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputIconGroup from "../common/InputIconGroup";

const ProfileForm = ({
  onSubmit,
  onChange,
  toggleSocialInputs,
  state,
  ...props
}) => {
  const {
    displaySocialInputs,
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    errors
  } = state;
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            {props.match.path === "/create-profile" ? (
              <CreateProfileHeader />
            ) : (
              <EditProfileHeader />
            )}
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Profile Handle"
                name="handle"
                value={handle}
                onChange={onChange}
                error={errors.handle}
                smallInfo="A unique handle for your profile URL"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={onChange}
                // selectOptions imported
                options={selectOptions}
                error={errors.status}
                smallInfo="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange}
                error={errors.company}
                smallInfo="Your company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange}
                error={errors.website}
                smallInfo="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                error={errors.location}
                smallInfo="City or city & state suggested (eg. Tampa Bay, FL)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                error={errors.skills}
                smallInfo="Please use comma separated values (eg. HTML, CSS, JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
                error={errors.githubusername}
                smallInfo="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={onChange}
                error={errors.bio}
                smallInfo="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={toggleSocialInputs}
                  className="btn btn-light"
                >
                  Add Social Media Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {/* if toggled then display the social media inputs */}
              {displaySocialInputs && (
                <div>
                  <InputIconGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={twitter}
                    onChange={onChange}
                    error={errors.twitter}
                    autoComplete="url"
                  />
                  <InputIconGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={facebook}
                    onChange={onChange}
                    error={errors.facebook}
                    autoComplete="url"
                  />
                  <InputIconGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={linkedin}
                    onChange={onChange}
                    error={errors.linkedin}
                    autoComplete="url"
                  />
                  <InputIconGroup
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={youtube}
                    onChange={onChange}
                    error={errors.youtube}
                    autoComplete="url"
                  />
                  <InputIconGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={instagram}
                    onChange={onChange}
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
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleSocialInputs: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  state: PropTypes.shape({
    displaySocialInputs: PropTypes.bool,
    handle: PropTypes.string,
    company: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    skills: PropTypes.string,
    githubusername: PropTypes.string,
    bio: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    youtube: PropTypes.string,
    instagram: PropTypes.string,
    errors: PropTypes.object
  }).isRequired
};

export default ProfileForm;
