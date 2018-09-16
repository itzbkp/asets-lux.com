import React, { Component } from "react";
import ImageFile from "./ImageFile";
import { connect } from "react-redux";
import getImages from "./ImageActions";

class ImageGrid extends Component {
  async componentDidMount() {
    await this.props.getImages();
  }

  render() {
    const { Images } = this.props;
    return (
      <div className="container">
        <div className="row">
          {Images.length
            ? Images.map(Image => {
                return <ImageFile imageDetails={Image} key={Image.id} />;
              })
            : "Loading..."}
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return { Images: state.Images };
  },
  { getImages }
)(ImageGrid);
