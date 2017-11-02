import React from "react";

import Ideabox from "./ideabox.js";
import { connect } from "react-redux";
import { click } from "../../../actions";

import clickPlus from "./images/click-plus-button.mp4";
import clickPlusOgg from "./images/click-plus-button.ogg";
import clickPlay from "./images/click-play-button.mp4";
import clickPlayOgg from "./images/click-play-button.ogg";
import drawSmiley from "./images/draw-smiley.mp4";
import drawSmileyOgg from "./images/draw-smiley.ogg";
import drawSecondSmiley from "./images/draw-second-smiley.mp4";
import drawSecondSmileyOgg from "./images/draw-second-smiley.ogg";
import animatedSmile from "./images/animate-smiley.mp4";
import animatedSmileOgg from "./images/animate-smiley.ogg";

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
    }, 80);


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

    let clearCanvas = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    let hereGlowsStatic = (segmentObj) => {

      let makeAllPixelsBlack = () => {
        let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
        for(let i = 0; i < imgData.data.length; i+=4) {
          imgData.data[i], imgData.data[i + 1], imgData.data[i + 2] = 0;
        }
      }

      let staticAndFade = () => {
        let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
        if(staticCounter > 46 && alphaVal >= 15){
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

        if(alphaVal <= 0 || staticCounter > 70) {
          // signal to sequencer that this function is done
          // actionObj.finished = true;
          segmentObj.finished = true;
          return false;
        } else {
          return setTimeout(staticAndFade, 30);
        }

      }

      // track how many times staticAndFade has run
      let staticCounter = 0;
      let alphaVal = 255;
      // run once to start off counter
      makeAllPixelsBlack();
      // start recursive static
      staticAndFade();
    }

    let writeOnCanvas = (segmentObj, str) => {


      ctx.font = "32px Georgia";
      let i = 0;
      let drawText = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillText(str.substr(0, i + 1), 100, 150);
        i++;
        if(i > str.length){
          // signal to sequencer that this action is finished
          segmentObj.finished = true;
          return false;
        } else {
          return setTimeout(drawText, 60);
        }
      }
      // start the chain reaction
      drawText();
    }

    let createVideo = (srcMP4, srcOGG, id) => {
      let supportsVideoElement = !!document.createElement('video').canPlayType;
      console.log("Does browser support video: " + supportsVideoElement);
      let video = document.createElement("video");
      video.id = id;
      // create source elements
      let sourceMP4 = document.createElement("source");
      sourceMP4.type = "video/mp4";
      sourceMP4.src = srcMP4;
      let sourceOGG = document.createElement("source");
      sourceOGG.type = "video/ogg";
      sourceOGG.src = srcOGG;
      video.appendChild(sourceMP4);
      video.appendChild(sourceOGG);

      return video;
    }

    let drawVideoOnCanvas = (segmentObj, v) => {
      if(v.ended) {
        segmentObj.finished = true;
        return false;
      }
      ctx.drawImage(v, 0, 0, 320, 240);
      setTimeout(function(){drawVideoOnCanvas(segmentObj, v)}, 20);
    }
    // class to construct show segments
    class Segment {
      constructor(waitTime){
        this.waitTime = waitTime;
        this.started = false;
        this.finished = false;
      }
    }
    // sub classes
    class StaticSeg extends Segment{
      action() {
        hereGlowsStatic(this);
      }
    }
    class WordsSeg extends Segment {
      constructor(waitTime, str) {
        super(waitTime);
        this.str = str;

      }
      action() {
        // pass keyword 'this' so that can refer to this WordsSeg obj we
        // create
        writeOnCanvas(this, this.str);
      }
    }
    class VideoSeg extends Segment {
      constructor(waitTime, srcMP4, srcOGG, id) {
        super(waitTime);
        this.srcMP4 = srcMP4;
        this.srcOGG = srcOGG;
        this.id = id;
      }
      action() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let video = createVideo(this.srcMP4, this.srcOGG, this.id);
        video.play();
        drawVideoOnCanvas(this, video);
      }
    }


    // sequence index to track current action
    let seqI = 0;
    // sequence of events (actions) in intro show
    let showSequence = [
      new StaticSeg(0),
      new WordsSeg(500, "Put your ideas in motion"),
      new WordsSeg(500, "start with a drawing"),
      new VideoSeg(0, drawSmiley, drawSmileyOgg, "draw-smiley"),
      new WordsSeg(500, "then click the plus button, it adds a frame"),
      new VideoSeg(0, clickPlus, clickPlusOgg, "click-plus"),
      new WordsSeg(500, "your first drawing becomes a shadow"),
      new WordsSeg(0, "and you can start drawing your next frame"),
      new VideoSeg(0, drawSecondSmiley, drawSecondSmileyOgg, "draw-sec-smiley"),
      new WordsSeg(0, "after a few frames, press play to see the animation"),
      new VideoSeg(0, clickPlay, clickPlayOgg, "click-play"),
      new WordsSeg(0, "got it? Time to try it out!")
    ];

    //
    // import clickPlus from "./images/click-plus-button.mp4";
    // import clickPlusOgg from "./images/click-plus-button.ogg";
    // import clickPlay from "./images/click-play-button.mp4";
    // import clickPlayOgg from "./images/click-play-button.ogg";
    // import drawSmiley from "./images/draw-smiley.mp4";
    // import drawSmileyOgg from "./images/draw-smiley.ogg";
    // import drawSecondSmiley from "./images/draw-second-smiley.mp4";
    // import drawSecondSmileyOgg from "./images/draw-second-smiley.ogg";
    // import animatedSmile from "./images/animate-smiley.mp4";
    // import animatedSmileOgg from "./images/animate-smiley.ogg";

    let sequencer = () => {
      let currSeg = showSequence[seqI];

      let currStarted = showSequence[seqI].started;
      let currFinished = showSequence[seqI].finished;
      let currWait = showSequence[seqI].waitTime;

      // only runs one time per action object
      if(!currStarted){
        // if hasn't started, run action
        setTimeout(()=>{currSeg.action()}, currWait);
        // signal to sequencer that action started, this lexical block
        // won't run next time.
        showSequence[seqI].started = true;
        // we're done with this iteration,
        // fire up the sequencer again so it can do its job
        return sequencer();
      }

      if (currFinished){
        // if it has finished, bump seqI to next spot and re-run sequencer
        // but if it is at the end, finish sequencer
        seqI++;
        if(seqI >= showSequence.length){
          // end sequencer, show's over
          return false;
        } else{
          return sequencer();
        }

      } else {
        // current action hasn't finished, run sequencer again after a short
        // wait.
        return setTimeout(sequencer, 60);
      }


    }

    // fire it up
    sequencer();

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
