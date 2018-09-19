import React, { Component } from "react";

import "../../App.css";
import { Button } from "react-bootstrap";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      deciseconds: 0,
      t: 0,
      buttonLabel: "Start"
    };

    this.timer = null;
    this.handleClickStartStop = this.handleClickStartStop.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
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
      this.setState({ buttonLabel: "resume" });
    } else {
      this.timer = setInterval(() => {
        let { t } = this.state;
        t++;

        const deciseconds = Math.floor(t % 100);
        const seconds = Math.floor((t / 100) % 60);
        const minutes = Math.floor(t / (100 * 60));

        this.setState({ t, deciseconds, seconds, minutes });
      }, 10);
      this.setState({ buttonLabel: "stop" });
    }
  }

  handleClickReset() {
    if (this.timer != null) {
      // stop this.timer
      clearInterval(this.timer);
      this.timer = null;
    }

    this.setState({
      t: 0,
      deciseconds: 0,
      seconds: 0,
      minutes: 0,
      buttonLabel: "Start"
    });
  }

  leading0(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    return (
      <div>
        <div className="stopwatch-time">
          {this.leading0(this.state.minutes)}:
          {this.leading0(this.state.seconds)}:
          {this.leading0(this.state.deciseconds)}
        </div>
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
          Reset
        </Button>
      </div>
    );
  }
}

export default Stopwatch;
