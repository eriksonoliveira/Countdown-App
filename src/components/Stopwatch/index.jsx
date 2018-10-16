import React, { Component } from "react";
import TimeElapsed from "./TimeElapsed";

import "../../App.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t: 0,
      buttonLabel: "START"
    };

    this.timer = null;
    this.handleClickStartStop = this.handleClickStartStop.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillUnmount() {
    // stop this.timer
    clearInterval(this.timer);
  }

  handleClickStartStop() {
    if (this.timer != null) {
      // stop this.timer
      clearInterval(this.timer);
      this.timer = null;

      // Update button label
      this.setState({ buttonLabel: "RESUME" });
    } else {
      this.startTime = Date.now();

      this.timer = setInterval(this.update, 10);
      // Update button label
      this.setState({ buttonLabel: "STOP" });
    }
  }

  update() {
    let delta = Date.now() - this.startTime;
    this.startTime = Date.now();

    this.setState(state => {
      return { t: state.t + delta };
    });
  }

  handleClickReset() {
    if (this.timer != null) {
      // stop this.timer
      clearInterval(this.timer);
      this.timer = null;
    }

    this.setState(state => {
      return {
        t: 0,
        buttonLabel: "START"
      };
    });
  }

  render() {
    return (
      <div key="stopwatch" className="stopwatch mt-3">
        <TimeElapsed timeElapsed={this.state.t} />
        <button
          className="margin-right stopwatch-btn stopwatch-start"
          onClick={this.handleClickStartStop}
        >
          {this.state.buttonLabel}
        </button>
        <button
          className="timer-btn stopwatch-btn stopwatch-reset"
          onClick={this.handleClickReset}
        >
          RESET
        </button>
      </div>
    );
  }
}

export default Stopwatch;
