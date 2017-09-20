import React from "react";

import Ideabox from "./ideabox.js";
import { connect } from "react-redux";
import { click } from "../../../actions";

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

    let drawFringe = (i) => {
      // this.ctx.strokeStyle = "#D4AF37";
      // stroke first with large, dark line for outline
      this.ctx.strokeStyle = "#353535";
      this.lineWidth = 4;

      if(i > 0 && i % 10 === 0){
        let x = this.drawArr[i - 5][0];
        let y = this.drawArr[i - 5][1];
        let slope = (this.drawArr[i][1] - this.drawArr[i - 5][1])/(this.drawArr[i][0] - this.drawArr[i - 5][0]);
        if(slope > 0.2 && slope < 5) {
          // positive

          // left of line
          this.ctx.beginPath();
          this.ctx.moveTo(x - 10, y + 10);
          this.ctx.lineTo(x - 20, y + 20);
          this.ctx.stroke();

          // right of line
          this.ctx.beginPath();
          this.ctx.moveTo(x + 10, y - 10);
          this.ctx.lineTo(x + 20, y - 20);
          this.ctx.stroke();
        } else if(slope < -0.2 && slope > -5) {
          // negative

          //left of line
          this.ctx.beginPath();
          this.ctx.moveTo(x - 10, y - 10);
          this.ctx.lineTo(x - 20, y - 20);
          this.ctx.stroke();

          //right of line
          this.ctx.beginPath();
          this.ctx.moveTo(x + 10, y + 10);
          this.ctx.lineTo(x + 20, y + 20);
          this.ctx.stroke();
        } else if(slope > 5 || slope < -5) {
          // vertical

          // left of line
          this.ctx.beginPath();
          this.ctx.moveTo(x - 10, y);
          this.ctx.lineTo(x - 20, y);
          this.ctx.stroke();

          // right of line
          this.ctx.beginPath();
          this.ctx.moveTo(x + 10, y);
          this.ctx.lineTo(x + 20, y);
          this.ctx.stroke();
        } else {
          // horizontal

          // above line
          this.ctx.beginPath();
          this.ctx.moveTo(x, y + 10);
          this.ctx.lineTo(x, y + 20);
          this.ctx.stroke();

          // below of line
          this.ctx.beginPath();
          this.ctx.moveTo(x, y - 10);
          this.ctx.lineTo(x, y - 20);
          this.ctx.stroke();
        }
      }
      // now stroke with light color for inside
      this.ctx.strokeStyle = "#ffbf00";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }

    let drawEffects = () => {
      // drawing speed increases until slowMark, then it slows
      let slowMark = 1000 / (1 + this.drawArr.length * 0.8 * 5);
      let secs = 0;
      for(let i = 0; i < this.drawArr.length; i++) {
        if(i / this.drawArr.length < .8){
          secs += 500 / (1 + i * 10);
        } else {

          // when i is 80% of this.drawArr.length, (i / (this.drawArr.length * .9))
          // is roughly 1. It gradually increases as i gets bigger. In the end maybe close
          // 20% of the 500 gets added to slowMark.
          secs += slowMark + (i / (this.drawArr.length * .8)) * 100 - 100;
        }

        setTimeout(()=> {strokeColor(i)}, secs/1.5);
        // refill drawing with new color
        setTimeout(()=>{
          //this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 10, 10)
          fillColor(i);
          // drawFringe(i);
        }, secs)
      }
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
