import React, { Component } from 'react';
import Clock from './Clock';
import Timer from './Timer';
import Stopwatch from './Stopwatch';
import '../App.css';
import { Grid, Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "December 25, 2018",
      newDeadlilne: '',
      min: 0,
      sec: 0,
      time: 0,
      endTime: 0
    };
  }

  //Change to a new deadline
  changeDeadline() {
    this.setState({
        deadline: this.state.newDeadline
    });
  }

  startTimer() {
    /*convert minutes and seconds to milliseconds,
    add that to current time and save the sum to the state*/
    this.setState({
      time: (this.state.min*60 + Number(this.state.sec))*1000
    }, () => {
      const endTime = new Date().getTime() + this.state.time;
      this.setState({endTime: endTime});
    });
  }

  render() {
    return (
      <Grid className="App">

        <div className="countdown">
          <h3 className="section-title">
            Countdown to {this.state.deadline}
          </h3>
          <Clock deadline={this.state.deadline}/>
          <Form inline>
            <FormControl className="Deadline-input"
              placeholder="new date"
              onChange={event => this.setState({newDeadline: event.target.value})}
            />
            <Button onClick={() => this.changeDeadline()}>Submit</Button>
          </Form>
        </div>

        <div className="timer">
          <h3 className="section-title">
            Timer
          </h3>
          <Form inline>
            <FormControl  className='Timer-input min'
            placeholder="min"
            onChange={event => this.setState({min: event.target.value})}
            />
            <FormControl  className='Timer-input sec'
            placeholder="sec"
            onChange={event => this.setState({sec: event.target.value})}
            />
            <Button onClick={() => this.startTimer()}>Start</Button>
          </Form>
          <Timer time={this.state.time} endTime={this.state.endTime}/>
        </div>

        <div className="stopwatch">
          <h3 className="section-title">
            Stopwatch
          </h3>
          <Stopwatch />
        </div>
      </Grid>
    );
  }
}

export default App;
