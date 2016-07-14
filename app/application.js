import React from 'react';
import ReactDOM from 'react-dom';

var vsprintf = require("sprintf-js").vsprintf;

require('normalize.css');
class App extends React.Component {
  render() {
    return <Clock />
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainngTime: 68,
    };
  }

  render() {
    var remainngTime = this.state.remainngTime;
    let minutes = parseInt(remainngTime / 60);
    let seconds = remainngTime % 60;

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