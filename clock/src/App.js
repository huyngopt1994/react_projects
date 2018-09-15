import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Clock extends Component {
  render() {
    return (
      <div>
          <h1>Hello world!</h1>
          <h2>This is {this.props.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;
