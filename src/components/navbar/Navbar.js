import React from "react";

class Navbar extends React.Component {

  componentDidMount() {
    this.props.setNavCollScrollHeight(this.navbarCollapse);
    this.props.setNavCollStyleTrans(this.navbarCollapse);
  }

  render() {
    return(
      <nav className="navbar">
        <div className="navbar-header">
          <a className="brand" href="#">Joe Hoskisson</a>
          <button onClick={this.props.handleButtClick} className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div ref={(ref) => this.navbarCollapse = ref} className="navbar-collapse" style={{height: this.props.height + 'px'}}>
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
