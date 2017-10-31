import React from "react";

import Ideabox from "./ideabox.js";
import { connect } from "react-redux";
import { click } from "../../../actions";


class IdeaboxContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      sketches: [],
      shadowSketches: []
    }
  }

  handleClick = (e) => {
  }

  handlePlus = (e) => {
    let canvas = document.getElementById("ideaCanv");
    let ctx = this.props.context;
    // this.ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);

    // get rid of previous translucent sketch
    for( let i = 3; i < imgData.data.length; i += 4){
      if(imgData.data[i] < 255 && imgData.data[i] > 0) {
        // console.log("found one more than zero, less than 255: " + imgData.data[i]);
        // console.log("alpha: " + imgData.data[i]);
        // console.log("r: " + imgData.data[i - 3]);
        // console.log("g: " + imgData.data[i - 2]);
        // console.log("b: " + imgData.data[i - 1]);
      }
      // && imgData.data[i - 3] === 10
      if(imgData.data[i] === 60 ) {
        imgData.data[i] = 0; // alpha, maybe only this necessary
        imgData.data[i - 1] = 0; // blue
        imgData.data[i - 2] = 0; // green
        imgData.data[i - 3] = 0; // red
      }
    }
    // Add sketch to sketches
    let sketches = this.state.sketches;
    sketches.push(imgData);
    this.setState({
      sketches: sketches
    });
    // make current sketch translucent
    //   put in function so doesn't pass imgData by reference and so it avoids
    //   making all imgData objets in sketches array translucent

    //   first apply removal of translucent pixels change
    ctx.putImageData(imgData, 0, 0);
    //   then make left over drawing translucent
    let newImgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for(let i = 3; i < newImgData.data.length; i += 4) {
      if(newImgData.data[i] > 0) {
        newImgData.data[i - 3] = 10; // red
        newImgData.data[i - 2] = 10; // green
        newImgData.data[i - 1] = 50; // blue
        newImgData.data[i] = 60; // alpha
      }
    }
    ctx.putImageData(newImgData,0,0);
    // Store translucent sketche
    let shadowSketch = ctx.getImageData(0,0,canvas.width, canvas.height);
    let shadowSketches = this.state.shadowSketches;
    shadowSketches.push(shadowSketch);
    this.setState({
      shadowSketches
    })
  }

  handlePlay = (e) => {

    let counter = 0;
    let ctx = this.props.context;

    let putLastShadowSketch = () => {
      let shadowLength = this.state.shadowSketches.length;
      console.log(shadowLength);
      // do nothing if haven't added any frames
      if(shadowLength === 0) { return; }
      // otherwise display last shadow sketch
      ctx.putImageData(this.state.shadowSketches[shadowLength - 1], 0, 0);
    }

    let showFrame = () => {
      ctx.putImageData(this.state.sketches[counter],0,0);
      counter++;
      if(counter === this.state.sketches.length) {
        clearInterval(playId);
        // display latest shadow sketch after some time
        setTimeout(putLastShadowSketch, 1000);
      }
    }
    let playId = setInterval(showFrame, 200);

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
      this.ctx.arc(X, Y, 8, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgb(20,20,20)';
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
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove}
      handlePlus={this.handlePlus} handlePlay={this.handlePlay} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
