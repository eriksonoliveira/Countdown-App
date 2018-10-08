import React, { Component } from "react";

import "../../progressBar.css";
import CircularProgressbar from "react-circular-progressbar";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      min: 0,
      sec: 0,
      time: 0,
      endTime: 0,
      percentage: 0,
      clockRunning: false
    };

    this.showClock = this.showClock.bind(this);
    this.hideClock = this.hideClock.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);

    this.timer = null;
  }

  componentWillUnmount() {}

  //Handle change in form, setting the minutes and seconds
  handleChangeForm(evt) {
    this.setState(
      {
        [evt.target.name]: evt.target.value
      },
      () =>
        this.setState({
          time: (this.state.min * 60 + Number(this.state.sec)) * 1000,
          seconds: this.state.sec,
          minutes: this.state.min
        })
    );
  }

  /*convert minutes and seconds to milliseconds,
  add that to current time and save the sum to the state as endTime*/
  handleStartTimer() {
    // Show progress bar and clock
    this.showClock();
    //  get endTime and start counting down
    setTimeout(() => {
      const endTime = new Date().getTime() + this.state.time;
      this.setState({ endTime }, () => {
        this.timer = setInterval(
          () => this.getTimeUntilZero(this.state.time, this.state.endTime),
          100
        );
      });
    }, 500);
  }

  leading0(num) {
    return num < 10 ? "0" + num : num;
  }

  getTimeUntilZero(time, endTime) {
    const currTime = new Date().getTime();
    const timeDiff = endTime - currTime;

    // The progress bar will only reach 100 when timeDiff reaches 0
    // However, the timer shows only minutes and seconds.
    // Thus, when the time left (timeDiff) is 0.999s or less
    // the timer would've already reached 00:00
    // and the bar would be behind by ~ 1 sec.
    // Therefore, the progress bar percentage was advanced in one sec in the code below (timeDiff - 1000)
    const percentage = (1 - (timeDiff - 1000) / time) * 100;

    if (timeDiff > 0) {
      const seconds = Math.floor((timeDiff / 1000) % 60);
      const minutes = Math.floor(timeDiff / (1000 * 60));

      this.setState({ minutes, seconds, percentage });
    } else {
      this.setState({ minutes: 0, seconds: 0, percentage: 100 });
      clearInterval(this.timer);
    }
  }

  showClock() {
    this.setState({
      clockRunning: true
    });
  }

  hideClock() {
    this.setState({
      clockRunning: false
    });
  }

  cancel() {
    const currTime = new Date().getTime();
    this.setState({
      minutes: 0,
      seconds: 0,
      min: 0,
      sec: 0,
      endTime: currTime,
      percentage: 0
    });
    clearInterval(this.timer);
    this.hideClock();
  }

  render() {
    return (
      <div className="timer margin-top">
        {this.state.clockRunning ? (
          <div className="timer-clock">
            <div className="timer-clock-text">
              <div className="clock-text-wrap">
                <span className="clock-minutes">
                  {this.leading0(this.state.minutes)}
                </span>
                :
                <span className="clock-seconds">
                  {this.leading0(this.state.seconds)}
                </span>
              </div>
            </div>
            <div className="progressBar">
              <CircularProgressbar
                percentage={this.state.percentage}
                strokeWidth={3}
                textForPercentage={null}
              />
            </div>
            <button className="timer-cancel-btn" onClick={() => this.cancel()}>
              Back
            </button>
          </div>
        ) : (
          <form className="timer-form">
            <label htmlFor="timer-input-minutes" className="sr-only">
              Minutes
            </label>
            <input
              id="timer-input-minutes"
              type="text"
              className="timer-input min mr-1"
              placeholder={this.leading0(this.state.minutes)}
              name="min"
              onChange={event => this.handleChangeForm(event)}
            />
            <label htmlFor="timer-input-seconds" className="sr-only">
              Seconds
            </label>
            <input
              id="timer-input-seconds"
              type="text"
              className="timer-input sec"
              placeholder={this.leading0(this.state.seconds)}
              name="sec"
              onChange={event => this.handleChangeForm(event)}
            />
            <button
              type="button"
              className="timer-start-button"
              onClick={() => this.handleStartTimer()}
            >
              Start
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Timer;
