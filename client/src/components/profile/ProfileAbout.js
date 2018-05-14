import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../utils/isEmpty";

const firstName = names => names.trim().split(" ")[0];

const ProfileAbout = ({ profile }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-light mb-3">
        <h3 className="text-center text-info">
          {firstName(profile.user.name)}
        </h3>
        <p className="lead">
          {isEmpty(profile.bio) ? (
            <span>{firstName(profile.user.name)} does not have a bio</span>
          ) : (
            <span>{profile.bio}</span>
          )}
        </p>
        <hr />
        <h3 className="text-center text-info">Skill Set</h3>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {profile.skills.map((skill, index) => (
              <div key={index} className="p-3">
                <i className="fa fa-check" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
