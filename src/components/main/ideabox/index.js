import React from "react";

import Ideabox from "./ideabox.js";
import { connect } from "react-redux";
import { click } from "../../../actions";

/*
  Next steps:
  - make the gleam happen only once the gold redraw finishes
  - make it sparkle/glow
*/


class IdeaboxContainer extends React.Component {

  handleClick = (e) => {
  }

  handleMouseDown = (e) => {
    this.isMouseDown = true;
    this.ctx = this.props.context;
  }

  handleMouseUp = (e) => {
    this.isMouseDown = false;
  }

// When button down and mouse moving moves, draw small rectangles at cursor
// location.
  handleMouseMove = (e) => {
    if(this.isMouseDown) {
      var X = e.pageX - e.target.offsetLeft;
      var Y = e.pageY - e.target.offsetTop;
      this.ctx.beginPath();
      this.ctx.arc(X, Y, 10, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  pizzazzIt = () => {
    // get image data and canvas element
    let canvas = document.getElementById("ideaCanv");

    let hereGlows = () => {
      let imgData = this.ctx.getImageData(0,0,canvas.width, canvas.height);
      let ctx = this.ctx;
      // array to store edge points
      let edgeArr = [];
      // length of data for one unit of canvas width
      let dataRow = 4 * canvas.width;

      for(let i = 0; i < imgData.data.length; i+=4) {
        imgData.data[i], imgData.data[i + 1], imgData.data[i + 2] = 0;
      }
      function randomBlack() {
        for(let i = 3; i < imgData.data.length; i += 4) {
          if(Math.random() >= 0.5) {
            imgData.data[i] = 0;
          } else {
            imgData.data[i] = 255;
          }

        }
        ctx.putImageData(imgData,0,0);
      }
      let randomTime = setInterval(randomBlack, 200);
      setTimeout(function(){clearInterval(randomTime)}, 6000);

    }

  } // end pizzazzIt

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
