import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../redux/actions/profileActions";

const Experience = ({ experience, deleteExperience }) => (
  <div>
    <h4 className="mb-4">Experience Credentials</h4>
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Years</th>
        </tr>
      </thead>
      <tbody>
        {experience.map(exp => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
              {exp.to === null ? (
                " Current Job"
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteExperience(exp._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
};

export default connect(null, { deleteExperience })(Experience);
