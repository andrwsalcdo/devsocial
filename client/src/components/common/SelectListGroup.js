import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({
  placeholder,
  name,
  value,
  onChange,
  error,
  smallInfo,
  options
}) => (
  <div className="form-group">
    <select
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={
        error
          ? "form-control form-control is-invalid"
          : "form-control form-control-lg"
      }
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {smallInfo && <small className="form-text text-muted">{smallInfo}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

SelectListGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  smallInfo: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
