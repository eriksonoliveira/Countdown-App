import React, { Component } from 'react';

import '../../App.css';
import { Form, FormControl, Button } from 'react-bootstrap';

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
      clockRunning: false
    }

    this.showClock = this.showClock.bind(this);
    this.hideClock = this.hideClock.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);
  }

  componentWillMount() {
    this.getTimeUntilZero(this.state.time, this.state.endTime);
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntilZero(this.state.time, this.state.endTime), 1000);
    //After the first run, run the method again every second
  }

  //Handle change in form
  handleChangeForm(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  /*convert minutes and seconds to milliseconds,
  add that to current time and save the sum to the state as endTime*/
  handleStartTimer() {
    this.setState({
      time: (this.state.min*60 + Number(this.state.sec))*1000
    }, () => {
      const endTime = new Date().getTime() + this.state.time;
      this.setState({endTime});
    });
    this.showClock();
  }

  leading0(num) {
    return num < 10 ? '0' + num : num; //Using ternary expression to shorten conditional
  }

  getTimeUntilZero(time, endTime) {
    const currTime = new Date().getTime();
    const timeDiff = endTime - currTime;

    if(timeDiff > 0) {

      const seconds = Math.floor((timeDiff/1000) % 60);
      const minutes = Math.floor(timeDiff/(1000 * 60));

      this.setState({minutes, seconds});
    } else {
      this.setState({minutes: 0, seconds: 0});
    }
  }

  showClock() {
        this.setState({
        clockRunning: true
      });
      console.log(this.state.clockRunning);
  }

  hideClock() {
      this.setState({
        clockRunning: false
      });
  }

  cancel() {
    const currTime = new Date().getTime();
    this.setState({endTime: currTime});
    this.hideClock();
  }

  render() {

    return(
      <div>
        
        {this.state.clockRunning ? 
        <div>
          <div className="timer">
          {/* <div className={`${this.state.visibility} timer`}> */}
            <div className="clock-minutes">
              {this.leading0(this.state.minutes)}
            </div>
            :
            <div className="clock-seconds">
              {this.leading0(this.state.seconds)}
            </div>
          </div>
          <Button onClick={() => this.cancel()}>Cancel</Button>
        </div>
        : null}

        {
          this.state.clockRunning ? null
          :
        <Form inline>
      {/*<FormControl  className={`${isVisible} Timer-input min`}*/}
          <FormControl  className='Timer-input min'
            // placeholder="min"
            placeholder={this.leading0(this.state.minutes)}
            name="min"
            onChange={event => this.handleChangeForm(event)}
            />
          {/* <FormControl  className={`${isVisible} Timer-input sec`} */}
          <FormControl  className='Timer-input sec'
          placeholder={this.leading0(this.state.seconds)}
          name="sec"
          onChange={event => this.handleChangeForm(event)}
          />
          <Button onClick={() => this.handleStartTimer()}>Start</Button>
        </Form>
        }
      </div>
    );
  }
}

export default Timer;