import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectFile from "./project/ProjectFile";

class App extends Component {
  state = {
    projects: ["1st", "2nd", "3rd", "4th"],
    active: 0
  };

  changeProject = id => () => {
    this.setState({
      active: id
    });
  };

  render() {
    const { projects, active } = this.state;
    return (
      <Fragment>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-12">
              {projects.map((id, i) => (
                <ProjectFile id={id} key={id} show={i === active} />
              ))}
            </div>
          </div>
          <br />
          <div className="btn-group col">
            {projects.map((id, i) => (
              <button
                className="btn col-md-3"
                key={id}
                onClick={this.changeProject(i)}
              >
                Project-
                {id}
              </button>
            ))}
          </div>
        </div>
        <h6 style={{ textAlign: "center", marginTop: "400px" }}>
          *Loading works well with 1st Project
        </h6>
      </Fragment>
    );
  }
}

export default App;
