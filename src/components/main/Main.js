import React from "react";

import Contact from "./contact";
import Experience from "./experience";
import Header from "./header";
import Ideabox from "./ideabox/index.js";
import Work from "./work";

class Main extends React.Component {
  render() {
    return (
      <div>
          <Header />
          <Work />
          <Experience />
          <Ideabox />
          <Contact />
      </div>
    );
  }
}

export default Main;
