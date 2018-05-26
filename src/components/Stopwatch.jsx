import React, { Component } from "react";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min :0,
      sec :0
    }
  }

  render() {
    return(
      <div>
        {this.state.min}:{this.state.sec}
      </div>
    );
  }
}

export default Stopwatch;
