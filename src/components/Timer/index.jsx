import React, { Component } from 'react';

import '../../App.css';
import '../../progressBar.css';
import { Form, FormControl, Button } from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';

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
    }

    this.showClock = this.showClock.bind(this);
    this.hideClock = this.hideClock.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);
    
    this.timer = null;
  }


  // componentWillMount() {
  //   this.getTimeUntilZero(this.state.time, this.state.endTime);
  // }

  // componentDidMount() {
  //   //After the first run, run the method again every second
  //   setInterval(() => this.getTimeUntilZero(this.state.time, this.state.endTime), 1000);
  // }

  //Handle change in form, setting the minutes and seconds
  handleChangeForm(evt) {
    this.setState({
      [evt.target.name]: evt.target.value}, 
      () => this.setState({ 
        time: (this.state.min*60 + Number(this.state.sec))*1000,
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
        this.setState(
          { endTime }, 
          () => {
            this.timer = setInterval(() => this.getTimeUntilZero(this.state.time, this.state.endTime), 100);
        });
      } 
      ,500);
      }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }

  getTimeUntilZero(time, endTime) {
    const currTime = new Date().getTime();
    const timeDiff = endTime - currTime;

    // Rounding down the number of seconds by using Math.floor
    // creates an issue with the progress bar's synchronization
    // The bar would always be behind by ~ 1 sec.
    // thus, the progress bar percentage was advanced in one sec in the code below
    const percentage = Math.floor( (1 - ((timeDiff - 1000) / time)) * 100);

    if(timeDiff > 0) {

      const seconds = Math.floor((timeDiff/1000) % 60);
      const minutes = Math.floor(timeDiff/(1000 * 60));

      this.setState({minutes, seconds, percentage});
    } else {
      this.setState({minutes: 0, seconds: 0, percentage: 100});
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
    this.setState({minutes: 0, seconds: 0, min: 0, sec: 0, endTime: currTime, percentage: 0});
    clearInterval(this.timer);
    this.hideClock();
  }

  render() {
    return(
      <div className="margin-top">
      {
          this.state.clockRunning ? 
        <div className="timer-clock">
          <div className="timer-clock-content">
            <div className="clock-minutes">
              {this.leading0(this.state.minutes)}
            </div>
            :
            <div className="clock-seconds">
              {this.leading0(this.state.seconds)}
            </div>
            <Button className="cancelTimer timer-btn" onClick={() => this.cancel()}>Cancel</Button>
          </div>
          <div className="progressBar">
            <CircularProgressbar 
              percentage={this.state.percentage}
              strokeWidth={3}
              textForPercentage={null}
            />
          </div>
        </div>
        : null
      }

      {
        this.state.clockRunning ? null
        :
        <Form inline>
          <FormControl  className='timer-input margin-right min'
            placeholder={this.leading0(this.state.minutes)}
            name="min"
            onChange={event => this.handleChangeForm(event)}
            />
          <FormControl  className='timer-input margin-right sec'
          placeholder={this.leading0(this.state.seconds)}
          name="sec"
          onChange={event => this.handleChangeForm(event)}
          />
          <Button className="startTimer timer-btn" onClick={() => this.handleStartTimer()}>Start</Button>
        </Form>
      }
      </div>
    );
  }
}

export default Timer;
