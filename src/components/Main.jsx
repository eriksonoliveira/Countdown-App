import React from "react";

import Clock from "./Clock/index";
import Timer from "./Timer/index";
import Stopwatch from "./Stopwatch/index";
import Tabs from "./Tabs";

const Main = props => {
  return (
    <div className="content-wrap">
      <div className="App">
        <Tabs active={props.active} handleChange={props.handleChangeTab} />
        <div className="content d-flex justify-content-center mt-5">
          {props.active === "Countdown" ? (
            <Clock
              deadline={props.deadline}
              handleChangeDeadline={props.handleChangeDeadline}
              handleChangeForm={props.handleChangeForm}
            />
          ) : null}

          {props.active === "Timer" ? (
            <Timer
              time={props.time}
              endTime={props.endTime}
              handleChangeForm={props.handleChangeForm}
              handleStartTimer={props.handleStartTimer}
            />
          ) : null}

          {props.active === "Stopwatch" ? <Stopwatch /> : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
