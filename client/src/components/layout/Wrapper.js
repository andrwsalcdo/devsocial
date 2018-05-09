import React from "react";
import PropTypes from "prop-types";

const styles = {
  flex: "1 0 auto"
};

const Wrapper = ({ children }) => <div style={styles}>{children}</div>;

Wrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Wrapper;
