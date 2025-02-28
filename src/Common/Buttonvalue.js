import React from "react";
import PropTypes from "prop-types";

const Buttonvalue = ({ text, type = "button", className = "", onClick, ...props }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

Buttonvalue.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Buttonvalue;
