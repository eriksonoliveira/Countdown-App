import React, { Component } from 'react';

import Clock from './Clock/index';
import Timer from './Timer/index';
import Stopwatch from './Stopwatch/index';
import Tabs from './Tabs';

import '../App.css';
import video from '../videos/bg-video.mp4';
import { Grid } from 'react-bootstrap';

class Main extends Component {
  render() {
    return (
      <div className={`content-wrap`}>

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
          <div className="content d-flex justify-content-center mt-5">
            {
              this.props.active === 'countdown' ?
                <div key="countdown" className="countdown content-inner mt-3">
                  <h4 className="section-title">
                    Countdown to {this.props.deadline}
                  </h4>

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
                <div key="timer" className="timer mt-3">
                  {/* <h3 className="section-title">
                    Timer
                  </h3> */}
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
                <div key="stopwatch" className="stopwatch mt-3">
                  {/* <h3 className="section-title">
                    Stopwatch
                  </h3> */}
                  <Stopwatch />
                </div>
                : null
            }
          </div>
        </Grid>

        <video autoPlay muted loop id="bgVideo">
          {/* <source src="https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4"/> */}
          <source src={video}/>
        </video>
      </div>
    );
  }
}

export default Main;
