require('normalize.css');
require('./application.css');

import React from 'react';
import ReactDOM from 'react-dom';

var vsprintf = require("sprintf-js").vsprintf;

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Clock remainingTime="3" onStop={this.onStop}/>
      </div>
    )
  }

  onStop() {
    console.log("on stop");
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.remainingTime,
      minutes: this.getMinutes(props.remainingTime),
      seconds: this.getSeconds(props.remainingTime),
      onStop: props.onStop,
      status: "off"
    };
  }

  getMinutes(time){
    let minutes =  time / 60;
    return minutes > 0 ? minutes : 0;
  }

  getSeconds(time){
    let seconds =  time % 60;

    return seconds > 0 ? seconds : 0;
  }

  componentDidMount(){
    this.kickoff();
  }

  kickoff() {
    this.setState({status: "on"});
    const interval = 10;    
    this.tick(interval)   
  }

  tick(interval){    
    var remainingTime = this.state.remainingTime - interval/1000.0;

    this.setState({remainingTime: remainingTime});
    if(remainingTime <= 0) {
      this.stop();
    } else {
      setTimeout(() => {
        this.tick(interval)
      }, interval);
    }
  }

  stop(){
    this.state.onStop()
  }

  render() {
    return(
      <div className="clock">
        <span className="minutes">{vsprintf("%02d", [this.getMinutes(this.state.remainingTime)])}</span>
        <span className="separator">:</span>
        <span className="seconds">{vsprintf("%02d", [this.getSeconds(this.state.remainingTime)])}</span>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);