import React, { Component } from 'react';
import '../App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    //After the first run, run the method again every second
  }

  leading0(num) {
    //Add leding 0 if the number is less than 10 so that the html element does not change width
    return num < 10 ? '0' + num : num; 
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());

    const seconds = Math.floor((time/1000) % 60);
    const minutes = Math.floor((time/(1000 * 60)) % 60);
    const hours = Math.floor((time/(1000 * 60 * 60)) % 24);
    const days = Math.floor(time/(1000 * 60 * 60 * 24));

    if(time > 0) {
      this.setState({days, hours, minutes, seconds});
    } else {
      this.setState({days: 0, hours: 0, minutes: 0, seconds: 0});
    }
    //If the state properties and the variables have the same name it tis allowed to write
    //the name only once
  }

  render() {
    return(
      <div>
        <div className="clock-days">{this.leading0(this.state.days)} days</div>
        <div className="clock-hours">{this.leading0(this.state.hours)} Hours</div>
        <div className="clock-minutes">{this.leading0(this.state.minutes)}</div>
        <div className="clock-seconds">{this.leading0(this.state.seconds)}</div>
      </div>
    );
  }
}

export default Clock;
