import React from 'react';

class NavCollapse extends React.Component{
  render() {
    return (
      <div className="navbar-collapse">
        <ul>
          <li><a className="navLink" href="#">Home</a></li>
          <li><a className="navLink" href="#">About</a></li>
        </ul>
      </div>
    )
  }
}

export default NavCollapse;
