import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  placeholder,
  name,
  value,
  onChange,
  error,
  smallInfo
}) => (
  <div className="form-group">
    <textarea
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={
        error
          ? "form-control form-control is-invalid"
          : "form-control form-control-lg"
      }
    />
    {smallInfo && <small className="form-text text-muted">{smallInfo}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextAreaFieldGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  smallInfo: PropTypes.string
};

export default TextAreaFieldGroup;
