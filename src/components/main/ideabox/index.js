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
    //this.props.click();
  }

  handleMouseDown = (e) => {
    this.isMouseDown = true;
    this.ctx = this.props.context;
    // set color to default
    this.ctx.fillStyle = "#353535";
    this.ctx.strokeStyle = "#353535";
    this.ctx.lineWidth = 2;
    this.drawArr = [];
    console.log("mousedown");
  }

  handleMouseUp = (e) => {
    this.isMouseDown = false;
    this.pizzazzIt();
  }

// When button down and mouse moving moves, draw small rectangles at cursor
// location.
  handleMouseMove = (e) => {
    if(this.isMouseDown) {
      var X = e.pageX - e.target.offsetLeft;
      var Y = e.pageY - e.target.offsetTop;
      // this.ctx.fillRect(X, Y, 10, 10);
      this.ctx.beginPath();
      this.ctx.arc(X, Y, 10, 0, Math.PI * 2);
      this.ctx.fill();
      // this.ctx.stroke();
      this.drawArr.push([X,Y]);
    }
  }

  pizzazzIt = () => {
    // this.ctx.fillStyle = "#FF0000";
    this.ctx.fillStyle = "#a67c00";


    let strokeColor = (i) => {

      this.ctx.beginPath();
      //this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 10, 10)
      this.ctx.arc(this.drawArr[i][0], this.drawArr[i][1], 10, 0, Math.PI * 2);
      this.ctx.strokeStyle = "#ffbf00";
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
      // this.ctx.fillStyle = "#a67c00";
      // this.ctx.fill();
    }

    let fillColor = (i) => {

      this.ctx.beginPath();
      //this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 10, 10)
      this.ctx.arc(this.drawArr[i][0], this.drawArr[i][1], 10, 0, Math.PI * 2);
      // this.ctx.strokeStyle = "#ffbf00";
      // this.ctx.stroke();
      this.ctx.fillStyle = "#a67c00";
      this.ctx.fill();
    }

    let glowCount = null;

    // get image data and canvas element
    let canvas = document.getElementById("ideaCanv");
    console.log(this.ctx.getImageData(0,0,canvas.width, canvas.height));
    let waxingTransparent = true;

    let hereGlows = () => {
      // counter for animation frames
      if(!glowCount) { glowCount = 0;}
      glowCount++;
      let imgData = this.ctx.getImageData(0,0,canvas.width, canvas.height);
      // array to store edge points
      let edgeArr = [];
      // length of data for one unit of canvas width
      let dataRow = 4 * canvas.width;
      for(let i = 0; i < imgData.data.length; i += dataRow * 1){
        // find edges of painted part of canvas by checking alpha data
        // Paint in gleam border on edges
        for (let j = 3; j < dataRow; j += 4) {
          // ignore golden gleam edges
          if(imgData.data[i + j - 3] === 255 && imgData.data[i + j - 2] === 191 && imgData.data[i + j - 1] === 0) {
            continue;
          }
          // find edges by horizontal checking
          if(imgData.data[i + j] === 255 && (imgData.data[i + j - 4] !== 255 || imgData.data[i + j + 4] !== 255)) {
            // imgData.data[i + j - 3] = 255;
            // imgData.data[i + j - 2] = 191
            // imgData.data[i + j - 1] = 0;
            let x = j / 4;
            let y = i / dataRow;
            edgeArr.push([x, y]);
          }
          if(imgData.data[i + j] === 255 && (imgData.data[i + j - dataRow] !== 255 || imgData.data[i + j + dataRow] !== 255)){
            let x = j / 4;
            let y = i /dataRow;
            edgeArr.push([x,y]);
          }
          // find edges by vertical checking
        }


        // for(let j = 0; j < dataRow; j += 4){
        //   imgData.data[i + j] = 200;
        // }
        // for(let k = 1; k < dataRow; k += 4){
        //   imgData.data[i + k] = 0;
        // }
        // for(let l = 2; l < dataRow; l += 4){
        //   imgData.data[i + l] = 0;
        // }
        //
        // for(let m = 3; m < dataRow; m += 4) {
        //   imgData.data[i + m] = 255;
        // }

        // for(let i = 0; i < 5000; i++) {
        //   console.log(imgData.data[i]);
        // }

        // ignore white pixels
        // if(imgData.data[i-3] === 0 && imgData.data[i-2] === 0 && imgData.data[i-1] === 0) {
        //   continue;
        // }
        // if(waxingTransparent) {
        //   imgData.data[i] -= 1;
        //   if(imgData.data[i] < 100) {
        //     waxingTransparent = false;
        //   }
        // } else {
        //   imgData.data[i] += 1;
        //   if(imgData.data[i] >= 255) {
        //     waxingTransparent = true;
        //   }
        // }
      }
      // console.log(edgeArr);
      // draw gleaming circles on edges
      for(let i = 0; i < edgeArr.length; i++) {
        this.ctx.beginPath();
        this.ctx.arc(edgeArr[i][0], edgeArr[i][1], 2, 0, Math.PI * 2);
        this.ctx.fillStyle = "#ffbf00";
        this.ctx.fill();
      }
      // draw the change
      //this.ctx.putImageData(imgData,0,0);

      // if(glowCount < 150) {
      //   requestAnimationFrame(hereGlows);
      // }

      // console.log(this.ctx.getImageData(0,0,canvas.width, canvas.height));
    }

    let drawEffects = () => {
      // drawing speed increases until slowMark, then it slows
      let slowMark = 1000 / (1 + this.drawArr.length * 0.8 * 5);
      let secs = 0;
      for(let i = 0; i < this.drawArr.length; i++) {
        if(i / this.drawArr.length < .8){
          secs += 400 / (1 + i * 10);
        } else {

          // when i is 80% of this.drawArr.length, (i / (this.drawArr.length * .9))
          // is roughly 1. It gradually increases as i gets bigger. In the end maybe close
          // 20% of the 500 gets added to slowMark.
          secs += slowMark + (i / (this.drawArr.length * .8)) * 100 - 100;
        }

        //setTimeout(()=> {strokeColor(i)}, secs/1.1);
        // refill drawing with new color
        setTimeout(()=>{
          //this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 10, 10)
          fillColor(i);
          // drawFringe(i);
        }, secs);

      }
      setTimeout(hereGlows, 3000);
    }

    drawEffects();

  } // end pizzazzIt

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
