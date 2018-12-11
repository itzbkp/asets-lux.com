import React, { Component } from "react";
import ImageFile from "./ImageFile";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import FileSaver from "file-saver";

const defaultColor = "#ffffff";
const shapes = ["Circle", "Square", "Triangle"];

class ProjectFile extends Component {
  state = {
    shape: "circle",
    color: defaultColor,
    lastUsedColors: Array(4).fill(defaultColor)
  };

  handleEvents = (event, prop) => {
    const newState = { ...this.state };
    newState[prop] = event.target.value;
    this.setState(newState);
  };

  handleActions = (newColor, action) => () => {
    const { lastUsedColors } = this.state;
    let last = lastUsedColors.length;

    switch (action) {
      case "undo":
        const recentColor = lastUsedColors[last - 1];
        while (last--) {
          last === 0
            ? (lastUsedColors[0] = recentColor)
            : (lastUsedColors[last] = lastUsedColors[last - 1]);
        }
        break;
      default:
        lastUsedColors[last - 1] !== newColor &&
          lastUsedColors.forEach((color, i) => {
            last - 1 !== i
              ? (lastUsedColors[i] = lastUsedColors[i + 1])
              : (lastUsedColors[last - 1] = newColor);
          });
    }
    this.setState({
      lastUsedColors
    });
  };

  loadFile = event => {
    try {
      var input = event.target;
      const ProjectFile = this;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => ProjectFile.setState(JSON.parse(reader.result));
    } catch (error) {
      console.log(error.message);
    }
  };

  saveFile = () => {
    var blob = new Blob([JSON.stringify(this.state)]);
    FileSaver.saveAs(blob, `Project-${this.props.id}.txt`);
  };

  render() {
    const { id, show } = this.props;
    const openFile = `loadFile${id}`;
    const { shape, color, lastUsedColors } = this.state;
    const { handleEvents, handleActions, loadFile, saveFile } = this;
    const last = lastUsedColors.length;

    return (
      <div
        className="container rounded border p-4"
        style={{ display: !show && "none" }}
      >
        <h4 style={{ textAlign: "center" }}>{id} Project</h4>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-2">
            <div className="form-group">
              <label>Select Shape</label>
              <select
                className="form-control"
                id="imageShape"
                onChange={event => handleEvents(event, "shape")}
                value={shape}
              >
                {shapes.map(shape => (
                  <option key={shape} value={shape.toLowerCase()}>
                    {shape}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Colour Code:</label>
              <input
                type="color"
                name="imageColor"
                className="form-control"
                onChange={event => handleEvents(event, "color")}
                value={color}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary col"
                onClick={handleActions(color)}
              >
                Save
              </button>
            </div>
            <div className="form-group">
              <button
                className="btn col-md-5 mr-4"
                onClick={handleActions(undefined, "undo")}
              >
                Undo
              </button>
              <button
                className="btn col-md-5"
                onClick={handleActions(lastUsedColors[0])}
              >
                Redo
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <ImageFile
              shape={shape}
              color={lastUsedColors[last - 1]}
              lastUsedColors={lastUsedColors}
            />
          </div>
          <div className="col-md-1">
            <input
              type="file"
              style={{ display: "none" }}
              id={openFile}
              onChange={loadFile}
            />
            <button
              className="btn"
              style={{ marginTop: "150px" }}
              onClick={() => $("#" + openFile).click()}
            >
              <FA icon={faFileUpload} className="mr-2" />
              Load
            </button>
            <button className="btn mt-3" onClick={saveFile}>
              <FA icon={faFileDownload} className="mr-2" />
              Save
            </button>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default ProjectFile;
