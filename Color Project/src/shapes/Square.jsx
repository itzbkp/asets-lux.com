import React from "react";

const Square = ({ x, y, height, width, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <g fill={color}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: { color }
          }}
        />
      </g>
    </svg>
  );
};

export default Square;
