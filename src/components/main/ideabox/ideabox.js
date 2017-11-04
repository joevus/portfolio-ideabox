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
    // update width of canvas
    let canvasWidth = document.getElementById('canvas-container').offsetWidth;
    this.setState({canvasWidth});

    // update height of canvas for mobile
    if(window.innerWidth < 768) {
      if(window.innerWidth > window.innerHeight){
        // for landscape mode
        // set canvas height as window height, disregarding toolbars
        let canvasHeight = window.outerHeight;
        this.setState({canvasHeight});
      } else {
        // for portrait mode
        // make canvas as tall as screen is wide. This way, the canvas won't
        // be taller than the screen when shifted to landscape mode.
        let canvasHeight = window.innerWidth;
        this.setState({canvasHeight});
      }

    } else {
      // if not mobile make height 400px
      let canvasHeight = 400;
      this.setState({canvasHeight});
    }
    // let canvasHeight =
    // if updateDimension gets called again (like on a resize event)
    // retrieve canvas ctx and store it.
    var ctx = this.refs.canvas.getContext('2d');
    this.props.storeCanvasCtxt(ctx);
  }

  setToolbarPlacement() {

    checkMobileOrientationAndSetToolbar();

    // throttle resize event as it fires at a quick rate and we are
    // reorganizing the DOM
    (function() {
      window.addEventListener("resize", resizeThrottler, false);

      var resizeTimeout;
      function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in
        // the queue
        if(!resizeTimeout) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();

            // The actualResizeHandler will execute at a rate of 15fps
          }, 66);
        }
      }

      function actualResizeHandler() {
        checkMobileOrientationAndSetToolbar();
      }
    }());


    // Check if mobile size and whether portrait or landscape. Set screen size
    // accordingly.

    function checkMobileOrientationAndSetToolbar() {
      // .canvas-and-toolbar-cont{
      //   display: grid;
      //   grid-template-columns: 540px 84px;
      // }
      if(window.innerWidth < 768) {
        let canvasAndTools = document.getElementsByClassName("canvas-and-toolbar-cont")[0];
        let toolbar = document.getElementsByClassName("toolbar")[0];
        let canvasCont = document.getElementById("canvas-container");
        if(window.innerWidth < window.innerHeight) {
          // portrait orientation
          if(canvasAndTools.style.display) {
            // remove display: grid by checking if there's a display inline
            // style and removing all in-line styles.
              canvasAndTools.removeAttribute('style');
              toolbar.removeAttribute('style');
              canvasCont.removeAttribute('style');
          }

        } else {
          // landscape mode
          canvasAndTools.style.display = "grid";
          canvasAndTools.style.gridTemplateColumns = "90% 10%";
          toolbar.style.flexDirection = "column";
          canvasCont.style.border = "solid #333 1px";
        }
      }
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    // put update dimensions here so that scrollbars have time to appear and
    // will be taken into account for the width
    this.updateDimensions();
    this.setToolbarPlacement();


    var ctx = this.refs.canvas.getContext('2d');
    this.props.storeCanvasCtxt(ctx);
  }

  render() {
    return(
        <div className="cntr-on-small-plus main-top">
          <div id="intro-frame" onClick={this.props.handleIntroClick} className="intro-frame">

            <img src={playButton} alt="play button" />
            <h1>Idea</h1>
            <h1>Box</h1>

            {/* <h1>Box</h1>*/}
          </div>
          <div className="canvas-and-toolbar-cont">
            <div id="canvas-container">
              <canvas ref="canvas" id="ideaCanv" width={this.state.canvasWidth + "px"}
              height={this.state.canvasHeight + "px"} onClick={this.props.handleClick} onMouseDown={this.props.handleMouseDown} onMouseUp={this.props.handleMouseUp} onMouseMove={this.props.handleMouseMove} onTouchStart={this.props.handleTouchStart}
              onTouchMove={this.props.handleTouchMove}></canvas>
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
