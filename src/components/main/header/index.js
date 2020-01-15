import React from "react";

class Header extends React.Component {
  render() {
    return (
      <section id="header" className="container">
        <div className="row">
          <h1>Hello, I'm Joe</h1>
          <h2>Fullstack web developer, emphasis on Ruby and NodeJS.</h2>
          <h2>I have an interest in doing good, building bridges between cultures, entrepreneurship, and literature.</h2>
          <p className="languages"><span>Hablo español</span><span className="arabic">و احكي عربي</span></p>
          {/* <p className="arabic">و احكي عربي</p> */}
        </div>

      </section>

    );
  }
}

export default Header;
