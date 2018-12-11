import React from "react";

const Square = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g {...rest}>
        <rect {...rest} />
      </g>
    </svg>
  );
};

export default Square;
