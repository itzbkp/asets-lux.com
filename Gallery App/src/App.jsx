import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageGrid from "./gallery/ImageGrid";

const App = () => {
  return (
    <Fragment>
      <div className="jumbotron">
        <h1>Random Image Gallery</h1>
        <br />
        <br />
        <ImageGrid />
      </div>
    </Fragment>
  );
};

export default App;
