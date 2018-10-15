import React, { Component } from "react";
import TimeElapsed from "./TimeElapsed";

import "../../App.css";
import { Button } from "react-bootstrap";

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
      // this.timer = setInterval(() => {
      //   let { t } = this.state;
      //   t++;

      //   const deciseconds = Math.floor(t % 100);
      //   const seconds = Math.floor((t / 100) % 60);
      //   const minutes = Math.floor(t / (100 * 60));

      //   this.setState((state) => {
      //     return { t, deciseconds, seconds, minutes }
      //   });
      // }, 10);

      this.startTime = Date.now();

      this.timer = setInterval(this.update, 10);
      // Update button label
      this.setState({ buttonLabel: "STOP" });
    }
  }

  update() {
    let delta = Date.now() - this.startTime;
    // console.log(this.state.t, delta);

    // const drift = 10 - delta;
    // delta += drift;
    // console.log(delta, drift);
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
        <Button
          className="margin-right stopwatch-start"
          onClick={this.handleClickStartStop}
        >
          {this.state.buttonLabel}
        </Button>
        <Button
          className="timer-btn stopwatch-reset"
          onClick={this.handleClickReset}
        >
          RESET
        </Button>
      </div>
    );
  }
}

export default Stopwatch;
