import React from "react";
import PropTypes from "prop-types";

const Buttonvalue = ({
  text,
  type = "button",
  className = "",
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {text || children}
    </button>
  );
};

Buttonvalue.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Buttonvalue;
