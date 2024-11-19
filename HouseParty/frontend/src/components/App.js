import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import "../../static/css/index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        {/* Motion background */}
        <div className="motion-background"></div>

        {/* Main content */}
        <div className="center">
          <HomePage />
        </div>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
