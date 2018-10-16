import React from "react";

const Tabs = props => {
  const tabs = ["Countdown", "Timer", "Stopwatch"];
  return (
    <div className="tabs">
      <div className="tabs-inner container">
        {tabs.map(tab => {
          let className = `tab ${tab}`;

          className += tab === props.active ? " tab-active" : "";

          return (
            <div
              className={className}
              onClick={() => props.handleChange(tab)}
              key={tab}
            >
              {tab.toUpperCase()}
            </div>
          );
        })}
        <div className={`indicator ${props.active}`} />
      </div>
    </div>
  );
};

export default Tabs;
