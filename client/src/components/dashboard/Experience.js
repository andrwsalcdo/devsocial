import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../redux/actions/profileActions";

const Experience = ({ experience, deleteExperience }) => {
  const handleDeleteExp = id => {
    deleteExperience(id);
  };
  return (
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
                {exp.from} - {exp.to}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteExp(exp._id)}
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
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array
};

export default connect(null, { deleteExperience })(Experience);
