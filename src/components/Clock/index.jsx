import React, { Component } from "react";
import ClockForm from "./ClockForm";
import "../../App.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    this.timer = null;
  }

  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }

  componentDidMount() {
    //After the first run, run the method again every second
    this.timer = setInterval(
      () => this.getTimeUntil(this.props.deadline),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  leading0(num) {
    //Add leding 0 if the number is less than 10 so that the html element does not change width
    return num < 10 ? "0" + num : num;
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());

    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    if (time > 0) {
      this.setState({ days, hours, minutes, seconds });
    } else {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }

  render() {
    return (
      <div id="countdown" className="countdown content-inner mt-3">
        <p className="countdown-header">Countdown to</p>
        <p className="countdown-date mt-5">{this.props.deadline}</p>
        <div className="clock">
          <span className="clock-days">
            {this.leading0(this.state.days)} days
          </span>
          <span className="clock-hours">
            {this.leading0(this.state.hours)} Hours
          </span>
          <span className="clock-minutes">
            {this.leading0(this.state.minutes)}
          </span>
          <span className="clock-seconds">
            {this.leading0(this.state.seconds)}
          </span>
        </div>
        <ClockForm
          handleChangeForm={this.props.handleChangeForm}
          handleChangeDeadline={this.props.handleChangeDeadline}
        />
      </div>
    );
  }
}

export default Clock;
