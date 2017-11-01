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
    // to track whether intro has been clicked
    this.introClicked = false;
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
      // offsetParent because the parent is position:relative
      var Y = e.pageY - e.target.offsetParent.offsetTop;
      this.ctx.beginPath();
      this.ctx.arc(X, Y, 8, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgb(20,20,20)';
      this.ctx.fill();
    }
  }

  handleIntroClick = () => {
    // For first click on canvas, if clicked anywhere besides "skip intro",
    // run introShow. Otherwise, skip intro.

    const introFrame = document.getElementById("intro-frame");
    let opac = window.getComputedStyle(introFrame).getPropertyValue("opacity");
    let fadeId = setInterval(function(){
      opac -= .1;

      introFrame.style.opacity = opac;

      if(opac <= 0) {
        introFrame.style.display = "none";
        clearInterval(fadeId);
      }
      // console.log("run fade");
    }, 120);


    if(!this.introClicked){
      this.introShow();
    }

  }

  handleLoad = () => {
    // run things that need to run when component loads
  }

  componentDidMount = () => {
    this.handleLoad();
    // this.ctx = this.props.context;
  }

  introShow = () => {
    // get image data and canvas element
    let canvas = document.getElementById("ideaCanv");
    let ctx = canvas.getContext("2d");



    let hereGlowsStatic = () => {


      let makeAllPixelsBlack = () => {
        let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
        for(let i = 0; i < imgData.data.length; i+=4) {
          imgData.data[i], imgData.data[i + 1], imgData.data[i + 2] = 0;
        }
      }

      let staticAndFade = () => {
        let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
        if(staticCounter > 38 && alphaVal >= 15){
          // decrease alpha value to make fade
          alphaVal -= 15;
        }
        // make random pixels transparent or opaque
        // fade alphaVal from opaque to transparent after
        // staticCounter number of iterations
        for(let i = 3; i < imgData.data.length; i += 4) {
          if(Math.random() >= 0.5) {
            imgData.data[i] = 0;
          } else {
            imgData.data[i] = alphaVal;
          }

        }
        ctx.putImageData(imgData,0,0);
        staticCounter++;
      }

      // track how many times staticAndFade has run
      let staticCounter = 0;
      let alphaVal = 255;
      // run once to start off counter
      makeAllPixelsBlack();

      return setInterval(staticAndFade, 30);
    }

    let writePutYour = () => {

      ctx.font = "32px Georgia";
      let str = "Put your ideas in motion";
      let i = 0;
      let drawText = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillText(str.substr(0, i + 1), 100, 150);
        i++;
      }
      return setInterval(drawText, 60);
    }

    let staticId = hereGlowsStatic();
    let putYourId;
    // start static
    setTimeout(function(){
      clearInterval(staticId)
    }, 3000);
    // pause for 1000, then write "Put your ideas in motion"
    setTimeout(function(){
      putYourId = writePutYour();
    }, 4000);
    // let "Put your..." run for 5000
    setTimeout(function(){
      clearInterval(putYourId);
    }, 9000);
    // write "start with a drawing"


  } // end introShow

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove}
      handlePlus={this.handlePlus} handlePlay={this.handlePlay}
      handleLoad={this.handleLoad} handleIntroClick={this.handleIntroClick} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
