import React from "react";

import githubMark from "../../../assets/github_mark.png";
import linkedIn from "../../../assets/linkedin.png";

class Contact extends React.Component {
  render() {
    return (
      <section id="contact" className="container">
        <div className="row">
          <h1>Glad you visited.</h1>
          <p className="see_more">See more: 
            <a href="https://www.linkedin.com/in/joehoskisson/">
              <img src={linkedIn} alt="LinkedIn logo" />
            </a>
            <a href="https://github.com/joevus">
              <img src={githubMark} alt="Github logo" />
            </a>
          </p>
          <p>To contact me, reach out via <a href="mailto:joehoskisson@gmail.com">email.</a></p>
        </div>

      </section>

    );
  }
}

export default Contact;
