import React, { Component } from 'react';

import Clock from './Clock';
import Timer from './Timer';
import Stopwatch from './Stopwatch';
import Tabs from './Tabs';

import '../App.css';
// import { Grid, Form, FormControl, Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';

// class App extends Component {
const Main = props => {    

  //render() {

    //let backgroundClass = `${this.props.active}-bg`;

    return (
      <div className={`content-wrap`}>

        <div className={`${this.props.active}-bg`}></div>
        <Grid className="App">

          {/* Tabs Component */}
          <Tabs
            active={this.props.active}
            onChange={this.props.handleChangeTab}
          >
            <div key="countdown">Countdown</div>
            <div key="timer">Timer</div>
            <div key="stopwatch">Stopwatch</div>
          </Tabs>

          {/* Render Components according to this.props.active */}
          <div className="content">
            {
              this.props.active === 'countdown' ?
                <div key="countdown" className="countdown content-inner">
                  <h3 className="section-title">
                    Countdown to {this.props.deadline}
                  </h3>

                  {/* Clock Component */}
                  <Clock
                    deadline={this.props.deadline}
                    handleChangeDeadline={this.props.handleChangeDeadline}
                    handleChangeForm={this.props.handleChangeForm}
                  />

                  {/* <Form inline>
                    <FormControl className="Deadline-input"
                      placeholder="new date"
                      onChange={event => this.setState({newDeadline: event.target.value})}
                    />
                    <Button onClick={() => this.handleChangeDeadline()}>
                      Submit
                    </Button>
                  </Form> */}
                </div>
                : null
            }

            {
              this.props.active === 'timer' ?
                <div key="timer" className="timer">
                  <h3 className="section-title">
                    Timer
                  </h3>
                  {/* <Form inline>
                    <FormControl  className='Timer-input min'
                      placeholder="min"
                      onChange={event => this.setState({min: event.target.value})}
                    />
                    <FormControl  className='Timer-input sec'
                    placeholder="sec"
                    onChange={event => this.setState({sec: event.target.value})}
                    />
                    <Button onClick={() => this.handleStartTimer()}>Start</Button>
                  </Form> */}
                  <Timer
                    time={this.props.time}
                    endTime={this.props.endTime}
                    handleChangeForm={this.props.handleChangeForm}
                  />
                </div>
                : null
            }

            {
              this.props.active === 'stopwatch' ?
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
      </div>
    );
  //}
}

export default App;
