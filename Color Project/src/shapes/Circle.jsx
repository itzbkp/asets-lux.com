import React from "react";

const Circle = ({ ...rest }) => {
  return (
    <svg height="170" width="170" style={{ display: "block", margin: "auto" }}>
      <circle cx="85" cy="85" r="60" {...rest} />
    </svg>
  );
};

export default Circle;
