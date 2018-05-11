import React, { Component } from 'react';
import './App.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
    }
  }

  componentWillMount() {
    this.getTimeUntilZero(this.props.time, this.props.endTime);
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntilZero(this.props.time, this.props.endTime), 1000);
    //After the first run, run the method again every second
  }

  leading0(num) {
    return num < 10 ? '0' + num : num; //Using ternary expression to shorten conditional
  }

  getTimeUntilZero(time, endTime) {
    const currTime = new Date().getTime();
    const timeDiff = endTime - currTime;

    if(timeDiff > 0) {
      console.log(timeDiff);

      const seconds = Math.floor((timeDiff/1000) % 60);
      const minutes = Math.floor(timeDiff/(1000 * 60));

      this.setState({minutes, seconds});
    } else {
      this.setState({minutes: 0, seconds: 0});
    }
  }

  render() {
    return(
      <div>
        <div className="clock-minutes">{this.leading0(this.state.minutes)}</div>
        :
        <div className="clock-seconds">{this.leading0(this.state.seconds)}</div>
      </div>
    );
  }
}

export default Stopwatch;
