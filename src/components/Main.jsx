import React from "react";

import Clock from "./Clock/index";
import Timer from "./Timer/index";
import Stopwatch from "./Stopwatch/index";
import Tabs from "./Tabs";

import { Grid } from "react-bootstrap";

const Main = props => {
  return (
    <div className="content-wrap">
      <Grid className="App">
        {/* Tabs Component */}
        <Tabs active={props.active} handleChange={props.handleChangeTab}>
          <div key="countdown">Countdown</div>
          <div key="timer">Timer</div>
          <div key="stopwatch">Stopwatch</div>
        </Tabs>

        {/* Render Components according to props.active */}
        <div className="content d-flex justify-content-center mt-5">
          {props.active === "countdown" ? (
            <Clock
              deadline={props.deadline}
              handleChangeDeadline={props.handleChangeDeadline}
              handleChangeForm={props.handleChangeForm}
            />
          ) : null}

          {props.active === "timer" ? (
            <Timer
              time={props.time}
              endTime={props.endTime}
              handleChangeForm={props.handleChangeForm}
              handleStartTimer={props.handleStartTimer}
            />
          ) : null}

          {props.active === "stopwatch" ? <Stopwatch /> : null}
        </div>
      </Grid>
    </div>
  );
};

export default Main;
