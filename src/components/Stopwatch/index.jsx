import React, { Component } from 'react';

import '../../App.css';
import { Button } from 'react-bootstrap';

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes :0,
      seconds :0,
      deciseconds: 0,
      t: 0,
      buttonLabel: 'Start'
    }

    this.timer = null;
  }

  start() {
    if(this.timer != null) {
      //stop this.timer
      clearInterval(this.timer);
      this.timer = null;
      this.setState({buttonLabel: 'Start'});
    } else {

      this.timer = setInterval(() => {
        let { t } = this.state;
        t++;

        const deciseconds = Math.floor(t % 100);
        const seconds = Math.floor((t/100) % 60);
        const minutes = Math.floor(t/(100 * 60));

        
        this.setState({t, deciseconds, seconds, minutes});
      }, 10);
      const buttonLabel = 'Stop';
      this.setState({buttonLabel});
    }
  }

  reset() {
    if(this.timer != null) {
      //stop this.timer
      clearInterval(this.timer);
      this.timer = null;
    }

    const deciseconds = 0;
    const seconds = 0;
    const minutes = 0;
    const t = 0;

    this.setState({t, deciseconds, seconds, minutes});
  }

  leading0(num) {
    return num < 10 ? '0' + num : num;
  }

  render() {
    return(
      <div>
        <div className="stopwatch-time">
          {this.leading0(this.state.minutes)}
          :
          {this.leading0(this.state.seconds)}
          :
          {this.leading0(this.state.deciseconds)}
        </div>
        <Button className="margin-right timer-btn" onClick={() => this.start()}>{this.state.buttonLabel}</Button>
        <Button className="timer-btn" onClick={() => this.reset()}>Reset</Button>
      </div>
    );
  }
}

export default Stopwatch;
