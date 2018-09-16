import React from "react";

const Circle = ({ fill }) => {
  return (
    <svg height="170" width="170" style={{ display: "block", margin: "auto" }}>
      <circle cx="85" cy="85" r="60" fill={fill} />
    </svg>
  );
};

export default Circle;
