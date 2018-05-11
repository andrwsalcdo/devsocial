import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  smallInfo,
  error
}) => (
  <div className="form-group">
    <input
      type={type}
      className={
        error
          ? "form-control form-control-lg is-invalid"
          : "form-control form-control-lg"
      }
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {smallInfo && <small className="form-text text-muted">{smallInfo}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  smallInfo: PropTypes.string,
  error: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
