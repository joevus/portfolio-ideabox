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
    console.log(e.clientX, e.clientY);
    this.ctx = this.props.context;
    console.log(this.ctx);
    this.ctx.fillStyle = 'red';
  }

  handleMouseUp = (e) => {
    this.isMouseDown = false;
  }

// track x, y coordinates where mouse moves if isMouseDown is true. Then use those coordinates to draw lines.
  handleMouseMove = (e) => {
    if(this.isMouseDown) {
      var X = e.pageX - e.target.offsetLeft;
      var Y = e.pageY - e.target.offsetTop;
      this.ctx.fillRect(X, Y, 10, 10);
      console.log(e.clientX, e.clientY);

    }
  }

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
