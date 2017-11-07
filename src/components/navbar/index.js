import React from "react";

import Navbar from "./Navbar.js";

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      height: 0,
      navCollScrollHeight: null
    }
  }

  setNavCollScrollHeight = (ele) => {
    let num = ele.scrollHeight;
    this.setState({
      navCollScrollHeight: num
    });
  }

  // setNavCollStyleTrans = (ele) => {
  //   let str = ele.style.transition;
  //   this.setState({
  //     navCollStyleTrans: str
  //   });
  // }

  handleButtClick = () => {
    console.log(this.refs);
    if (this.state.collapsed) {
      this.expandElement(this.refs.navbarCollapse);
    } else {
      this.collapseElement(this.refs.navbarCollapse);
    }
  }

  collapseElement = () => {
    // reference to this
    let self = this;
    // much of this code came from css tricks
    // https://css-tricks.com/using-css-transitions-auto-dimensions/
    // simplified it, but may come back to it to see if it helps

    // get height of element's content, regardless of actual size
    let elHeight = this.state.navCollScrollHeight;
    // diable css transitions temporarily
    // let elTransition = element.style.transition;
    // element.style.transition = '';

    // on next frame (as soon as previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    // requestAnimationFrame(function() {
    //   element.style.height = elHeight + 'px';
    //   element.style.transition = elTransition;

      // on next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function() {
        self.setState({
          height: 0
        });
      });
    // });

    // mark the section as "currently collapsed"
    this.setState({
      collapsed: true
    })
  }

  expandElement = () => {
    // reference to this
    let self = this;
    // get the height of the element's inner content, regardless of its actual
    // size
    let elHeight = this.state.navCollScrollHeight;

    // have the element transition to the height of its inner content
    // element.style.height = elHeight + 'px';
    self.setState({
      height: elHeight
    });
    // when the next css transition finishes (which should be the one
    // we just triggered)
    // element.addEventListener('transitionend', function eventHandler(e) {
    //   // remove this event listener so it only gets triggered once
    //   element.removeEventListener('transitionend', eventHandler);
    //
    //   // set height to initial content-based value
    //
    // });

    // mark the element as "currently not collapsed"
    this.setState({
      collapsed: false
    });
  }

  render() {
    return(
      <Navbar height={this.state.height} collapsed={this.state.collapsed}
      handleButtClick={this.handleButtClick}
      setNavCollScrollHeight={this.setNavCollScrollHeight} />
    );
  }
}

export default NavbarContainer;
