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
      onStop: props.onStop,
      status: "off"
    };
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
    if(remainingTime <= 0) {
      this.stop();
    } else {
      this.setState({remainingTime: remainingTime});
      setTimeout(() => {
        this.tick(interval)
      }, interval);
    }
  }

  stop(){
    this.state.onStop()
  }

  render() {
    var remainingTime = parseInt(this.state.remainingTime);
    let minutes = remainingTime / 60;
    let seconds = remainingTime % 60;

    return(
      <div className="clock">
        <span className="minutes">{vsprintf("%02d", [minutes])}</span>
        <span className="separator">:</span>
        <span className="seconds">{vsprintf("%02d", [seconds])}</span>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);