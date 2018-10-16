import React, { PureComponent } from "react";

class LapsList extends PureComponent {
  render() {
    return (
      <ul className="lap-list mt-4">
        {this.props.laps.map(lap => {
          const time = this.props.getFormattedTime(lap.totalTime);
          const timeDiff = this.props.getFormattedTime(lap.diff);
          return (
            <li key={lap.totalTime} className="lap">
              <span className="lap-index">{lap.lapNumber} </span>
              <span className="lap-total-time">
                {this.props.addLeading0(time.minutes)}:
                {this.props.addLeading0(time.seconds)}.
                <small>{time.deciseconds}</small>
              </span>
              <span className="lap-diff">
                {this.props.addLeading0(timeDiff.minutes)}:
                {this.props.addLeading0(timeDiff.seconds)}.
                {timeDiff.deciseconds}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default LapsList;
