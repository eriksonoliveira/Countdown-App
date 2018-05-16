import React, { Component } from "react";
import Clock from './Clock';
import Stopwatch from './Stopwatch';
import "../App.css";
import { Form, FormControl, Button } from 'react-bootstrap';

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

  changeDeadline() {
    this.setState({
      deadline: this.state.newDeadline
    });
  }

  startStopwatch() {
    /*convert minutes and seconds to milliseconds,
    add that to current time and save the sum to the state*/
    this.setState({
      time: (this.state.min*60 + Number(this.state.sec))*1000
    }, function() {
      const endTime = new Date().getTime() + this.state.time;
      this.setState({endTime: endTime});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown to {this.state.deadline}</div>
        <Clock deadline={this.state.deadline}/>
        <Form inline>
          <FormControl className="Deadline-input"
            placeholder="new date"
            onChange={event => this.setState({newDeadline: event.target.value})}
        />
          <Button onClick={() => this.changeDeadline()}>Submit</Button>
        </Form>

        <div className="App-title">
          Stopwatch
        </div>
        <Form inline>
          <FormControl  className='Stopwatch-input min'
          placeholder="min"
          onChange={event => this.setState({min: event.target.value})}
          />
          <FormControl  className='Stopwatch-input sec'
          placeholder="sec"
          onChange={event => this.setState({sec: event.target.value})}
          />
          <Button onClick={() => this.startStopwatch()}>Start</Button>
        </Form>
        <Stopwatch time={this.state.time} endTime={this.state.endTime}/>
      </div>
    );
    // <Stopwatch time={{minutes: this.state.min, seconds: this.state.sec}}/>
  }
}

export default App;
