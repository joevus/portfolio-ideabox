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
    let canvasWidth;
    // update width of canvas
    if(window.innerWidth < 768 && (window.innerWidth < window.innerHeight)){
      // for mobile portrait make canvas as wide as would be in landscape
      canvasWidth = .9 * window.outerHeight;
    } else {
      // for all other screen situations, make it fit canvas-container
      canvasWidth = document.getElementById('canvas-container').offsetWidth;
    }

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
      <section id="ideabox">
        <h1>Idea Box</h1>
        <p>Just for fun, you can draw in this box and make your own animation.</p>
        <p><span>Step 1:</span> draw something in the box by pressing down and moving the mouse (or your finger).</p>
        <p><span>Step 2:</span> Press the <i className="fa fa-plus"></i> button or shift key to add the frame. A shadow of the frame will remain behind for reference.</p>
        <p><span>Step 3:</span> Repeat this a few times.</p>
        <p><span>Step 4:</span> Press the <i className="fa fa-play"></i> button or spacebar to see your animation.</p>
        <div className="cntr-on-small-plus">
          <div className="canvas-and-toolbar-cont">
            <div id="canvas-container">
              <canvas ref="canvas" id="ideaCanv" width={this.state.canvasWidth + "px"}
              height={this.state.canvasHeight + "px"} onMouseDown={this.props.handleMouseDown} onMouseUp={this.props.handleMouseUp} onMouseMove={this.props.handleMouseMove} onTouchStart={this.props.handleTouchStart}
              onTouchMove={this.props.handleTouchMove}></canvas>
            </div>

            <div className="toolbar">
              <button onClick={this.props.handlePlus}><i className="fa fa-plus"></i></button>
              <button onClick={this.props.handlePlay}><i className="fa fa-play"></i></button>
            </div>
          </div>
        </div>
        <p>You can see the code for this <a href="https://github.com/joevus/portfolio-ideabox/tree/master/src/components/main/ideabox">idea box</a> and the rest of this <a href="https://github.com/joevus/portfolio-ideabox">portfolio page on Github</a>. The site is built with React. The idea box uses HTML5 Canvas.</p>
      </section>
    );
  }
}

export default connect(null, { storeCanvasCtxt })(Ideabox);
