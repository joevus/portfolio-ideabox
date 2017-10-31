import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { storeCanvasCtxt } from "../../../actions";

import playButton from './images/play-button-pixa-bay-small.png';

class Ideabox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  updateDimensions() {
    let canvasWidth = document.getElementById('canvas-container').offsetWidth;
    this.setState({canvasWidth});
    // if updateDimension gets called again (like on a resize event)
    // retrieve canvas ctx and store it.
    var ctx = this.refs.canvas.getContext('2d');
    this.props.storeCanvasCtxt(ctx);
  }

  componentWillMount() {

  }

  componentDidMount() {
    // put update dimensions here so that scrollbars have time to appear and
    // will be taken into account for the width
    this.updateDimensions();
    // run things that need to laod when component mounts.
    // - paintIntroFrame
    // this.props.handleLoad();

    var ctx = this.refs.canvas.getContext('2d');
    this.props.storeCanvasCtxt(ctx);
  }

  render() {
    return(
        <div className="cntr-on-small-plus main-top">
          <div className="intro-frame">

            <img src={playButton} alt="play button" />
            <h1>Idea</h1>
            <h1>Box</h1>

            {/* <h1>Box</h1>*/}
          </div>
          <div className="canvas-and-toolbar-cont">
            <div id="canvas-container">
              <canvas ref="canvas" id="ideaCanv" width={this.state.canvasWidth + "px"} height="400px" onClick={this.props.handleClick} onMouseDown={this.props.handleMouseDown} onMouseUp={this.props.handleMouseUp} onMouseMove={this.props.handleMouseMove}></canvas>
            </div>

            <div className="toolbar">
              <button onClick={this.props.handlePlus}><i className="fa fa-plus"></i></button>
              <button onClick={this.props.handlePlay}><i className="fa fa-play"></i></button>
              {/* <button><i className="fa fa-step-backward fa-fw"></i></button>
              <button><i className="fa fa-step-forward fa-fw"></i></button>
              <button><i className="fa fa-pencil fa-fw"></i></button>
              <button><i className="fa fa-eraser fa-fw"></i></button> */}
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, { storeCanvasCtxt })(Ideabox);
