import React from "react";
import Square from "../shapes/Square";

const ColorsFile = ({ x, y, ...rest }) => {
  return (
    <div className="col-md-4" style={{ textAlign: "left" }}>
      <Square
        x={x}
        y={y}
        width={parseInt(x, 10) + 50}
        height={parseInt(y, 10) + 50}
        {...rest}
      />
    </div>
  );
};

export default ColorsFile;
