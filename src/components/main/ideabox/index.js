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
    var ctx = this.props.context;
    console.log(ctx);
    ctx.fillStyle = 'red';
    ctx.fillRect(20,20,90,90);
  }

  handleMouseUp = (e) => {
    this.isMouseDown = false;
  }

// track x, y coordinates where mouse moves if isMouseDown is true. Then use those coordinates to draw lines.
  handleMouseMove = (e) => {
    console.log(e.clientX, e.clientY);
  }

  render() {
    return (
      <Ideabox handleClick={this.handleClick} handleMouseDown={this.handleMouseDown} handleMouseUp={this.handleMouseUp} handleMouseMove={this.handleMouseMove} />
    );
  }
}

export default connect(state => state, {click})(IdeaboxContainer);
