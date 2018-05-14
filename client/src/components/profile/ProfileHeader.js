import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../utils/isEmpty";

const ProfileHeader = ({ profile }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
            <img
              src={profile.user.avatar.toString()}
              alt={`${profile.user.name}`}
              className="rounded-circle"
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="display-4 text-center">{profile.user.name}</h1>
          <p className="lead text-center">
            {profile.status}
            {isEmpty(profile.company) && <span>at {profile.company}</span>}
          </p>
          {isEmpty(profile.location) && <span>at {profile.location}</span>}
          <p>
            {isEmpty(profile.website) && (
              <a
                className="text-white p-2"
                href={profile.website}
                target="_blank"
              >
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {!isEmpty(profile.social && profile.social.twitter) && (
              <a
                className="text-white p-2"
                href={profile.social.twitter}
                target="_blank"
              >
                <i className="fas fa-twitter fa-2x" />
              </a>
            )}
            {!isEmpty(profile.social && profile.social.facebook) && (
              <a
                className="text-white p-2"
                href={profile.social.facebook}
                target="_blank"
              >
                <i className="fas fa-facebook fa-2x" />
              </a>
            )}
            {!isEmpty(profile.social && profile.social.linkedin) && (
              <a
                className="text-white p-2"
                href={profile.social.linkedin}
                target="_blank"
              >
                <i className="fas fa-linkedin fa-2x" />
              </a>
            )}
            {!isEmpty(profile.social && profile.social.youtube) && (
              <a
                className="text-white p-2"
                href={profile.social.youtube}
                target="_blank"
              >
                <i className="fas fa-youtube fa-2x" />
              </a>
            )}
            {!isEmpty(profile.social && profile.social.instagram) && (
              <a
                className="text-white p-2"
                href={profile.social.instagram}
                target="_blank"
              >
                <i className="fas fa-instagram fa-2x" />
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
