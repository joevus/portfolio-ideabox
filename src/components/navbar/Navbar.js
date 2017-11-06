import React from "react";

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

        <div className="navbar-collapse">
          <ul>
            <li><a className="navLink" href="#">Home</a></li>
            <li><a className="navLink" href="#">About</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
