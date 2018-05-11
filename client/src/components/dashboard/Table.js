import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  deleteExperience,
  deleteEducation
} from "../../redux/actions/profileActions";

const Table = ({
  header,
  th1,
  th2,
  data,
  deleteExperience,
  deleteEducation
}) => {
  const deleteRow = id => {
    // if true, then data = experience array
    header === "Experience Credentials"
      ? deleteExperience(id)
      : deleteEducation(id);
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
              <td>{d.company ? d.company : d.school}</td>
              <td>{d.title ? d.title : d.degree}</td>
              <td>
                <Moment format="YYYY/MM/DD">{d.from}</Moment> -
                {d.to === null ? (
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
  data: PropTypes.array.isRequired
};

export default connect(null, { deleteExperience, deleteEducation })(Table);
