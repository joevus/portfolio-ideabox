import React from "react";
import NavCollapse from "./NavCollapse";

class Navbar extends React.Component {
  render() {
    return(
      <nav className="navbar">
        <div className="navbar-header">
          <a className="brand" href="#">Joe Hoskisson</a>
          <button className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <NavCollapse />
      </nav>
    )
  }
}

export default Navbar;
