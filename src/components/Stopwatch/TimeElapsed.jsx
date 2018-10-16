import React, { Component } from "react";

class TimeElapsed extends Component {
  render() {
    const time = this.props.getFormattedTime(this.props.timeElapsed);

    return (
      <div className="stopwatch-time">
        {this.props.addLeading0(time.minutes)}:
        {this.props.addLeading0(time.seconds)}.<small>{time.deciseconds}</small>
      </div>
    );
  }
}

export default TimeElapsed;
