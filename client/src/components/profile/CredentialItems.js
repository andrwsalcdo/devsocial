import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const CredentialItems = ({ items, edu = false, exp = false }) => (
  <ul className="list-group">
    {items.map(item => (
      <li className="list-group-item" key={item._id}>
        <h4>{exp && item.company}</h4>
        <h4>{edu && item.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{item.from}</Moment>
          {item.current ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{item.to}</Moment>
          )}
        </p>
        {/* if exp is true (experience item) */}
        {exp && (
          <React.Fragment>
            <p>
              <strong>Position: </strong>
              {item.title}
            </p>
            <p>
              {item.location !== "" && (
                <span>
                  <strong>Location: </strong>
                  {item.location}
                </span>
              )}
            </p>
            <p>
              {item.description !== "" && (
                <span>
                  <strong>Description: </strong>
                  {item.description}
                </span>
              )}
            </p>
          </React.Fragment>
        )}
        {/* if edu is true (educationitem) */}
        {edu && (
          <React.Fragment>
            <p>
              <strong>Degree: </strong>
              {item.degree}
            </p>
            <p>
              <strong>Field of Study: </strong>
              {item.fieldofstudy}
            </p>
            <p>
              {item.description !== "" && (
                <span>
                  <strong>Description: </strong>
                  {item.description}
                </span>
              )}
            </p>
          </React.Fragment>
        )}
      </li>
    ))}
  </ul>
);

CredentialItems.propTypes = {
  items: PropTypes.array.isRequired,
  edu: PropTypes.bool,
  exp: PropTypes.bool
};

export default CredentialItems;
