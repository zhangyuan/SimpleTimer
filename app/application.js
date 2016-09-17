require('normalize.css');
require('./application.scss');

import React from 'react';
import ReactDOM from 'react-dom';

var vsprintf = require("sprintf-js").vsprintf;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "aaa"
    }
  }

  render() {
    return (
      <div className="main">
        <Clock remainingTime="3" onStarted={this.onStarted.bind(this)} onStop={this.onStop.bind(this)}/>

        <div className="title">
          {this.state.title}
        </div>

        <div className="buttons">
          <button onClick={this.startButtonClicked}>Go!</button>
        </div>
      </div>
    )
  }

  onStarted(){
    this.setState({title: "tick, tick, tick..."})
  }

  startButtonClicked(e) {
    console.log("onStartClicked")
  }

  onStop() {
    this.setState({title: "Time is up!"})
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.remainingTime = props.remainingTime;
    this.onStop = props.onStop;
    this.onStarted = props.onStarted;

    this.onStart = props.onStart;

    this.state = {
      remainingTime: props.remainingTime,
      status: "off"
    };
  }

  getMinutes(time){
    let minutes =  this.state.remainingTime / 60;
    return minutes > 0 ? minutes : 0;
  }

  getSeconds(time){
    let seconds =  this.state.remainingTime % 60;

    return seconds > 0 ? seconds : 0;
  }

  componentDidMount(){
    this.kickoff();
  }

  kickoff() {
    this.setState({status: "on"});
    const interval = 10;    
    this.tick(interval)
    this.onStarted();
  }

  clearTimeout(){
    clearTimeout(this.currentTimeout);
  }

  tick(interval){    
    var remainingTime = this.state.remainingTime - interval/1000.0;

    this.clearTimeout();
    this.setState({remainingTime: remainingTime});
    if(remainingTime <= 0) {
      this.stop();
    } else {
      this.currentTimeout = setTimeout(() => {
        this.tick(interval)
      }, interval);
    }
  }

  stop(){
    this.setState({status: 'off'})
    this.onStop()
  }

  render() {
    return(
      <div className={"clock " + this.state.status}>
        <span className="minutes">{vsprintf("%02d", [this.getMinutes()])}</span>
        <span className="separator">:</span>
        <span className="seconds">{vsprintf("%02d", [this.getSeconds()])}</span>
      </div>
    )
  }


}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);