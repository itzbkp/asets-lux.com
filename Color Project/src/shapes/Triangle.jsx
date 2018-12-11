import React from "react";

const Triangle = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="170"
      width="170"
      style={{ display: "block", margin: "auto" }}
    >
      <polygon points="85 25, 20 145, 150 145" {...rest} />
    </svg>
  );
};

export default Triangle;
