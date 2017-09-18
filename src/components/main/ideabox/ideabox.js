import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { storeCanvasCtxt } from "../../../actions";

class Ideabox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var ctx = this.refs.canvas.getContext('2d');
    this.props.storeCanvasCtxt(ctx);
    console.log(ctx);
  }

  render() {
    return(
      <div >
        <h2 className="ideaBoxHd">Idea Box</h2>
        <div className="simpleCntr">
          <canvas ref="canvas" id="ideaCanv" width="500px" height="350px" onClick={this.props.handleClick} onMouseDown={this.props.handleMouseDown} onMouseUp={this.props.handleMouseUp} onMouseMove={this.props.handleMouseMove}></canvas>
        </div>
        <div className="simpleCntr">
          <button>&lt;</button>
          <button>&gt;</button>
        </div>

      </div>
    );
  }
}

export default connect(null, { storeCanvasCtxt })(Ideabox);
