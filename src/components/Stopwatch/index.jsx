import React, { Component } from "react";
import TimeElapsed from "./TimeElapsed";
import LapsList from "./LapsList";

import "../../App.css";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t: 0,
      buttonLabel: "START",
      prevLap: 0,
      laps: []
    };

    this.lapCount = 0;
    this.timer = null;
    this.handleClickStartStop = this.handleClickStartStop.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.update = this.update.bind(this);
    this.addLap = this.addLap.bind(this);
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

  getFormattedTime(timeElapsed) {
    const sec = timeElapsed / 1000;
    const minutes = Math.floor(sec / 60).toString();
    const seconds = Math.floor(sec % 60).toString();
    const deciseconds = (sec % 1).toFixed(3).substring(2);

    return { deciseconds, seconds, minutes };
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
        buttonLabel: "START",
        laps: []
      };
    });
  }

  addLap() {
    this.setState(prevState => {
      const lapDiff = prevState.t - prevState.prevLap;
      return {
        laps: [
          { lapNumber: this.lapCount, totalTime: prevState.t, diff: lapDiff }
        ].concat(prevState.laps),
        prevLap: prevState.t
      };
    });

    this.lapCount++;
  }

  addLeading0(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    return (
      <div key="stopwatch" className="stopwatch mt-3">
        <TimeElapsed
          timeElapsed={this.state.t}
          getFormattedTime={this.getFormattedTime}
          addLeading0={this.addLeading0}
        />
        <button
          className="margin-right stopwatch-btn stopwatch-start"
          onClick={this.handleClickStartStop}
        >
          {this.state.buttonLabel}
        </button>
        {this.state.buttonLabel === "STOP" ? (
          <button
            className="timer-btn stopwatch-btn stopwatch-reset"
            onClick={this.addLap}
          >
            LAP
          </button>
        ) : (
          <button
            className="timer-btn stopwatch-btn stopwatch-reset"
            onClick={this.handleClickReset}
          >
            RESET
          </button>
        )}
        <LapsList
          laps={this.state.laps}
          getFormattedTime={this.getFormattedTime}
          addLeading0={this.addLeading0}
        />
      </div>
    );
  }
}

export default Stopwatch;
