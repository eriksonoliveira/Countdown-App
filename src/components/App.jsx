import React, { Component } from 'react';

import Main from './Main';

import '../App.css';
// import { Grid, Form, FormControl, Button } from 'react-bootstrap';

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
      active: 'timer'
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);
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
      this.setState({endTime});
    });
  }

  //Handle change in active tab
  handleChangeTab(active) {
    this.setState({active});
  }

  render() {
    return (
      <Main 
        {...this.state}
        handleChangeForm={this.handleChangeForm}
        handleChangeTab={this.handleChangeTab}
        handleChangeDeadline={this.handleChangeDeadline}
        handleStartTimer={this.handleStartTimer}
      />
    );
  }
}

export default App;