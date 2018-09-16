import React from "react";

const ImageFile = ({ imageDetails }) => {
  return (
    <figure className="col-md-3">
      <a href={imageDetails.thumbnailUrl}>
        <img alt="" src={imageDetails.url} className="img-fluid" />
        <label>{imageDetails.title}</label>
      </a>
    </figure>
  );
};

export default ImageFile;
