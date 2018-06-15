import React, { Component } from 'react';

import Clock from './Clock/index';
import Timer from './Timer/index';
import Stopwatch from './Stopwatch/index';
import Tabs from './Tabs';

import '../App.css';
import { Grid } from 'react-bootstrap';

class Main extends Component {
  render() {
    return (
      <div className={`content-wrap`}>

        <div className={`${this.props.active}-bg`}></div>
        <Grid className="App">

          {/* Tabs Component */}
          <Tabs
            active={this.props.active}
            handleChange={this.props.handleChangeTab}
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
                </div>
                : null
            }

            {
              this.props.active === 'timer' ?
                <div key="timer" className="timer">
                  <h3 className="section-title">
                    Timer
                  </h3>
                  <Timer
                    time={this.props.time}
                    endTime={this.props.endTime}
                    handleChangeForm={this.props.handleChangeForm}
                    handleStartTimer={this.props.handleStartTimer}
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
  }
}

export default Main;
