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
// import React from "react";
// import PropTypes from "prop-types";
// import "./CSS/tooltip.css"; 

// const Buttonvalue = ({ text, type = "button", className = "", onClick, disabled, tooltipText, ...props }) => {
//   return (
//     <div className="tooltip-container">
//       <button 
//         type={type} 
//         className={`btn ${className}`} 
//         onClick={onClick} 
//         disabled={disabled} 
//         {...props}
//       >
//         {text}
//       </button>
//       {disabled && tooltipText && <span className="tooltip-text">{tooltipText}</span>}
//     </div>
//   );
// };

// Buttonvalue.propTypes = {
//   text: PropTypes.string.isRequired,
//   type: PropTypes.string,
//   className: PropTypes.string,
//   onClick: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
//   tooltipText: PropTypes.string,
// };

// export default Buttonvalue;
