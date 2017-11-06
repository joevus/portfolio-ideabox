import React from "react";

class Navbar extends React.Component {
  render() {
    return(
      <nav className="navbar">
        <div className="brand"><a href="#">Joe Hoskisson</a></div>
        <div className="nav-right">
          <a className="navLink" href="#">Home</a>
          <a className="navLink" href="#">About</a>
        </div>
      </nav>
    )
  }
}

export default Navbar;
