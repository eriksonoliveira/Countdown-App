import React, { Component } from "react";

class TimeElapsed extends Component {
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    const sec = this.props.timeElapsed / 1000;

    const minutes = Math.floor(sec / 60).toString();
    const seconds = Math.floor(sec % 60).toString();
    const deciseconds = (sec % 1).toFixed(3).substring(2);

    return (
      <div className="stopwatch-time">
        {this.leading0(minutes)}:{this.leading0(seconds)}.
        <small className="stopwatch-time-small">{deciseconds}</small>
      </div>
    );
  }
}

export default TimeElapsed;
