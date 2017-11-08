import React from "react";

import Header from "./header";
import Ideabox from "./ideabox/index.js";

class Main extends React.Component {
  render() {
    return (
      <div>
          <Header />
          <Ideabox />
        <h1>Hi I'm Joe</h1>
      </div>
    );
  }
}

export default Main;
