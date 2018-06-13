import React, { Component } from 'react';

/* import Clock from './Clock';
import Timer from './Timer';
import Stopwatch from './Stopwatch';
import Tabs from './Tabs'; */
import Main from './Main';

import '../App.css';
import { Grid, Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "December 25, 2018",
      newDeadline: '',
      min: 0,
      sec: 0,
      time: 0,
      endTime: 0,
      active: 'countdown'
    };
  }

  //Change to a new deadline
  handleChangeDeadline() {
    this.setState({
        deadline: this.state.newDeadline
    });
  }

  //Handle change in form
  handleChangeForm(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  /*convert minutes and seconds to milliseconds,
  add that to current time and save the sum to the state*/
  handleStartTimer() {
    this.setState({
      time: (this.state.min*60 + Number(this.state.sec))*1000
    }, () => {
      const endTime = new Date().getTime() + this.state.time;
      this.setState({endTime: endTime});
    });
  }

  //Handle change in active tab
  handleChangeTab(active) {
    this.setState({active});
  }


  render() {

    let backgroundClass = `${this.state.active}-bg`;

    return (

      <Main 
        {...this.state}
        {...this.props}
        /* handleChangeTab={this.handleChangeTab}
        background={backgroundClass}
        handleChangeDeadline={this.handleChangeDeadline}
        handleChangeForm={this.handleChangeForm}
        handleStartTimer={this.handleStartTimer} */
      />);

      /* <div className={`content-wrap`}>

        <div className={backgroundClass}></div>
        <Grid className="App">

          <Tabs
            active={this.state.active}
            onChange={active => this.setState({active})}
          >
            <div key="countdown">Countdown</div>
            <div key="timer">Timer</div>
            <div key="stopwatch">Stopwatch</div>
          </Tabs>

          <div className="content">
            {
              this.state.active === 'countdown' ?
                <div key="countdown" className="countdown content-inner">
                  <h3 className="section-title">
                    Countdown to {this.state.deadline}
                  </h3>
                  <Clock
                    deadline={this.state.deadline}
                  />
                  <Form inline>
                    <FormControl className="Deadline-input"
                      placeholder="new date"
                      onChange={event => this.setState({newDeadline: event.target.value})}
                    />
                    <Button onClick={() => this.handleChangeDeadline()}>
                      Submit
                    </Button>
                  </Form>
                </div>
                : null
            }

            {
              this.state.active === 'timer' ?
                <div key="timer" className="timer">
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
                    <Button onClick={() => this.handleStartTimer()}>Start</Button>
                  </Form>
                  <Timer
                    time={this.state.time}
                    endTime={this.state.endTime}
                  />
                </div>
                : null
            }

            {
              this.state.active === 'stopwatch' ?
                <div key="stopwatch" className="stopwatch">
                  <h3 className="section-title">
                    Stopwatch
                  </h3>
                  <Stopwatch />
                </div>
                : null
            }
          </div>
        </Grid>
      </div> */
    //);
  }
}

export default App;
