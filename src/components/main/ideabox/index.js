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
    this.ctx.fillStyle = "black";
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
      this.ctx.fillRect(X, Y, 12, 12);
      this.drawArr.push([X,Y]);
    }
  }

  pizzazzIt = () => {
    this.ctx.fillStyle = "#FF0000";
    for(let i = 0; i < this.drawArr.length; i++) {
      let secs = 3000 / (1 + i * 10);
      setTimeout(()=>{this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 12, 12), secs})
      //this.ctx.fillRect(this.drawArr[i][0], this.drawArr[i][1], 12, 12);
    }
  }

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
