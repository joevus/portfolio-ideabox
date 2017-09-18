import React from "react";

class Navbar extends React.Component {
  render() {
    return(
      <div className="navbar">
        <div className="brand">Joe Hoskisson</div>
        <div className="navLink"><a href="#">about</a></div>
        <div className="navLink"><a href="#">projects</a></div>
        <div className="navLink"><a href="#">contact</a></div>
      </div>
    )
  }
}

export default Navbar;
