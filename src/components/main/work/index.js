import React from "react";

import climbingtree from "../../../assets/climbingtree.png";
import fitrunr from "../../../assets/fitrunr.png";
import meetmeon33rd from "../../../assets/meetmeon33rd_website.png";
import watergun from "../../../assets/water_gun.jpg";

class Work extends React.Component {
  render() {
    return (
      <section id="work" className="container">
        <div className="row">
          <h1>Featured Projects <i className="fa fa-chevron-down"></i></h1>
        </div>
        <div className="row work_grid">
            <div className="work_entry">
                <a href="https://github.com/joevus/climbingtreeMEAN">
                  <img src={climbingtree} alt="climbing tree logo" />
                </a>
                <h2>Climbing Tree Web App</h2>
                <p>Climbing Tree was a startup offering a directory of resources to help kids and parents learn STEM subjects. The Climbing Tree Web App had:</p>
                <ul>
                  <li>Mongo, Express, Angular, Node tech stack. </li>
                  <li>A custom content management system with an admin portal.</li>
                  <li>Custom navigation menu involving dynamic drawings on HTML 5 Canvas</li>
                  <li>Token authentication with JWT, signups, logins</li>
                  <li>User comments, ratings, and suggestions</li>
                </ul>
                <p>Not currently online, but <a href="https://github.com/joevus/climbingtreeMEAN">check out the code on Github</a></p>
            </div>
            <div className="work_entry">
                  <img src={fitrunr} className="black_background" alt="FitRunr logo" />
                <h2>FitRunr</h2>
                <p>FitRunr was a new brand for Sotrackit who I worked for. I built a website, store, and forum for it as the sole only developer on the project.</p>
                <ul>
                  <li>Well-designed website with full-width video (mobile and desktop) playing in background behind navbar and header of the home page. </li>
                  <li>Built with React, in case needed to extend features and to practice React.</li>
                  <li>Attached Shopify store, and WordPress site with members-only content</li>
                  <li>Set up Ngnix on a Ubuntu VPS. </li>
                  <li>Installed Flarum, an open-source forum software by digging into the install docs--wasn't a trivial install at the time.</li>
                </ul>
                <p>Not currently online or on a public Github repository, but can show you the code in person if asked. </p>
            </div>
            <div className="work_entry">
                <a href="https://www.kickstarter.com/projects/1559921240/raspberry-pi-water-gun-kit">
                  <img src={watergun} alt="photo of water gun" />
                </a>
                <h2>Raspberry Pi Water Gun</h2>
                <p>Built a water gun with an that you could connect to over WiFi with your laptop and control with the keyboard to shoot water or turn left and right. Used this as a teaching tool in STEM lessons and workshops:</p>
                <ul>
                  <li>Used Raspberry Pi and wrote a Python script. </li>
                  <li>Built own circuit with diode, battery pack, transistor, resistor, and relay.</li>
                  <li>Connected servo motor and electric pump via GPIO pins on the Pi.</li>
                  <li>Designed case and nozzle with 3d modeling software and had it 3d printed.</li>
                </ul>
                <p> <a href="https://www.kickstarter.com/projects/1559921240/raspberry-pi-water-gun-kit">See the Kickstarter video and page.</a></p>
            </div>
            <div className="work_entry">
                <a href="http://meetmeon33rd.com/">
                  <img src={meetmeon33rd} alt="screenshot of Meet Me on 33rd website" />
                </a>
                <h2>Meet Me on 33rd</h2>
                <p>Built a custom website for an event hosting business:</p>
                <ul>
                  <li>Used HTML, JavaScript, CSS </li>
                  <li>Made custom photo viewer that allows you swipe or to use scrolling action to browse the photos--at customer's request. </li>
                  <li>Worked directly with the client who was happy with the result and spontaneously offered to pay me extra at the end.</li>
                </ul>
                <p> <a href="http://meetmeon33rd.com/">See the website.</a></p>
            </div>
        </div>
      </section>

    );
  }
}

export default Work;
