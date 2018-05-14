import React from "react";
import PropTypes from "prop-types";
import CredentialItems from "./CredentialItems";

const ProfileCredentials = ({ experience, education }) => (
  <div className="row">
    <div className="col-md-6">
      <h3 className="text-center text-info">Experience</h3>
      {experience.length > 0 ? (
        <CredentialItems items={experience} exp={true} />
      ) : (
        <p className="text-center">No Experience Listed</p>
      )}
    </div>
    <div className="col-md-6">
      <h3 className="text-center text-info">Education</h3>
      {education.length > 0 ? (
        <CredentialItems items={education} edu={true} />
      ) : (
        <p className="text-center">No Education Listed</p>
      )}
    </div>
  </div>
);

ProfileCredentials.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCredentials;
