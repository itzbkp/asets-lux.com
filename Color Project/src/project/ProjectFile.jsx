import React, { Component, Fragment } from "react";
import ImageFile from "./ImageFile";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import FileSaver from "file-saver";

class ProjectFile extends Component {
  state = {
    shape: "circle",
    color: "#ffffff",
    lastUsedColors: ["#fff", "#fff", "#fff", "#fff"]
  };

  handleShape = event => {
    this.setState({
      shape: event.target.value
    });
  };

  handleColor = event => {
    this.setState({
      color: event.target.value
    });
  };

  handleSave = () => {
    const { color } = this.state;
    const lastUsedColors = this.updateLastUsedColors(color);
    this.setState({
      lastUsedColors
    });
  };

  onClickUndo = () => {
    const lastUsedColors = this.updateLastUsedColors(undefined, "undo");
    this.setState({
      lastUsedColors
    });
  };

  onClickRedo = () => {
    const color = this.state.lastUsedColors[0];
    const lastUsedColors = this.updateLastUsedColors(color);
    this.setState({
      lastUsedColors
    });
  };

  selectFile = () => {
    $("#loadFile").click();
  };

  loadFile = event => {
    try {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = function() {
        $("#inputData").val(reader.result);
      };
      reader.readAsText(input.files[0]);
      setTimeout(() => {
        console.log("Please try with 1st Project");
        console.log("Read:" + $("#inputData").val());
        this.setState(JSON.parse($("#inputData").val()));
      }, 100);
    } catch (error) {
      console.log(error.message);
    }
  };

  saveFile = () => {
    var blob = new Blob([JSON.stringify(this.state)], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, `Project-${this.props.id}.txt`);
  };

  updateLastUsedColors = (newColor, action) => {
    const lastUsedColors = this.state.lastUsedColors;
    let last = lastUsedColors.length;
    switch (action) {
      case "undo":
        const recentColor = lastUsedColors[last - 1];
        while (last--) {
          last === 0
            ? (lastUsedColors[0] = recentColor)
            : (lastUsedColors[last] = lastUsedColors[last - 1]);
        }
        return lastUsedColors;
      default:
        lastUsedColors[last - 1] !== newColor &&
          lastUsedColors.forEach((color, i) => {
            last - 1 !== i
              ? (lastUsedColors[i] = lastUsedColors[i + 1])
              : (lastUsedColors[last - 1] = newColor);
          });
        return lastUsedColors;
    }
  };

  render() {
    const { id, show } = this.props;
    const { shape, color, lastUsedColors } = this.state;
    const {
      handleShape,
      handleColor,
      handleSave,
      onClickUndo,
      onClickRedo,
      selectFile,
      loadFile,
      saveFile
    } = this;
    return (
      <Fragment>
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
                  onChange={handleShape}
                  value={shape}
                >
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>
              <div className="form-group">
                <label>Colour Code:</label>
                <input
                  type="color"
                  name="imageColor"
                  className="form-control"
                  onChange={handleColor}
                  value={color}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary col" onClick={handleSave}>
                  Save
                </button>
              </div>
              <div className="form-group">
                <button className="btn col-md-5 mr-4" onClick={onClickUndo}>
                  Undo
                </button>
                <button className="btn col-md-5" onClick={onClickRedo}>
                  Redo
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <ImageFile
                shape={shape}
                color={lastUsedColors[lastUsedColors.length - 1]}
                lastUsedColors={lastUsedColors}
              />
            </div>
            <div className="col-md-1">
              <input
                type="file"
                style={{ display: "none" }}
                id="loadFile"
                onChange={loadFile}
              />
              <input type="hidden" id="inputData" />
              <button
                className="btn"
                style={{ marginTop: "150px" }}
                onClick={selectFile}
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
      </Fragment>
    );
  }
}

export default ProjectFile;
