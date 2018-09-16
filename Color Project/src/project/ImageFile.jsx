import React, { Fragment } from "react";
import ColorsFile from "./ColorsFile";
import Square from "../shapes/Square";
import Circle from "../shapes/Circle";
import Triangle from "../shapes/Triangle";

const ImageFile = ({ shape, color, lastUsedColors }) => {
  const showImage = () => {
    switch (shape) {
      case "circle":
        return <Circle fill={color} />;
      case "square":
        return <Square x="120" y="30" width="240" height="150" color={color} />;
      case "triangle":
        return <Triangle fill={color} />;
      default:
        return;
    }
  };

  const length = lastUsedColors.length - 2;
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <div className="row" style={{ height: "170px" }}>
          {showImage()}
        </div>
        <label>LAST USED COLORS</label>
        <div className="row">
          {lastUsedColors.map(
            (color, i) =>
              i !== 3 && (
                <ColorsFile x={(length - i) * 20} y="0" color={color} key={i} />
              )
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default ImageFile;
