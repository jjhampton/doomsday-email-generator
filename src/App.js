import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Datepicker from './Datepicker';

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  dateChanged(date) {
    console.log('date changed to', date);
  }

  render() {
    const { date } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Doomsday email generator!</h1>
          <h2>
            We will help you compose an email to your boss about humanity's
            impending doom ... and why you won't make it to work
          </h2>
        </header>
        <Datepicker date={date} onDateChange={this.dateChanged}/>
      </div>
    );
  }
}

export default App;
