import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    tick(){
        // this function will be called in 1s , should update date object
        this.setState({
            date: new Date()
        });
    }
    componentWillMount() {
    }
    componentDidMount(){
        // This function will run after this component was rendered
        this.Timer = setInterval(() => this.tick(), 1000)

    }
    componentWillUnmount(){
        // clear timer, this function will run after this component was deleted
        clearInterval(this.Timer)
    }
  render() {
    return (
      <div>
          <h1>Hello world!</h1>
          <h2>This is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;
