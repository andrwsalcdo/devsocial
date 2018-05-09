import React from "react";
import PropTypes from "prop-types";

const InputIconGroup = ({
  icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  autoComplete,
  error
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={
        error
          ? "form-control form-control is-invalid"
          : "form-control form-control-lg"
      }
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

InputIconGroup.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoComplete: PropTypes.string
};

InputIconGroup.defaultProps = {
  autoComplete: "off",
  type: "text"
};

export default InputIconGroup;
