import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  deleteExperience,
  deleteEducation
} from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";

const Table = ({
  header,
  th1,
  th2,
  data,
  deleteExperience,
  deleteEducation,
  experience = false,
  education = false
}) => {
  const deleteRow = id => {
    if (experience) {
      deleteExperience(id);
    }
    if (education) {
      deleteEducation(id);
    }
  };
  return (
    <div>
      <h4 className="mb-4">{header}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>{th1}</th>
            <th>{th2}</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d._id}>
              {experience && (
                <React.Fragment>
                  <td>{d.company}</td>
                  <td>{d.title}</td>
                </React.Fragment>
              )}
              {education && (
                <React.Fragment>
                  <td>{d.school}</td>
                  <td>{d.degree}</td>
                </React.Fragment>
              )}
              <td>
                <Moment format="YYYY/MM/DD">{d.from}</Moment> -
                {d.current ? (
                  " Current"
                ) : (
                  <Moment format="YYYY/MM/DD">{d.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRow(d._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link
                  className="btn btn-info"
                  to={
                    (experience && `/experience/${d._id}`) ||
                    (education && `education/${d._id}`)
                  }
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  th1: PropTypes.string.isRequired,
  th2: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  experience: PropTypes.bool,
  education: PropTypes.bool
};

export default connect(null, {
  deleteExperience,
  deleteEducation
})(Table);
