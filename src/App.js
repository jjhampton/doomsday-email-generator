import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Datepicker from './Datepicker';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
      emailText: ''
    };
  }

  dateChanged = date => {
    this.setState({ date });
    this.fetchMetorData();
  }

  fetchMetorData = () => {
    console.log(this.state.date);
    const startDate = moment(new Date(this.state.date)).format('YYYY-MM-DD');
    const endDate = moment(new Date(this.state.date)).format('YYYY-MM-DD');
    const apiKey = 'DEMO_KEY';  // replace with NASA Api Key: https://api.nasa.gov/index.html#apply-for-an-api-key

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const potentiallyHazardousAsteroids = result.near_earth_objects[startDate].filter(x => x.is_potentially_hazardous_asteroid);
        if (potentiallyHazardousAsteroids.length)
          this.generateDoomsdayEmail();
        else
          this.generateSafeEmail();
      });    
  }

  generateSafeEmail = () => {
    const emailText = `
      Dear Boss,

      Looks like humanity will survive today. There are no 'Potentially Hazardous' asteroids on the way. See you at work!

      Sincerely,

      Your favorite employee
    `;

    this.setState({
      emailText: emailText
    });
  }

  generateDoomsdayEmail = (isDoomsdayEvent) => {    
    const emailText = `
      Dear Boss,

      We're all gonna die!!! I won't be at work today. You can't fire me, I quit!

      Sincerely,

      Your favorite employee
    `;

    this.setState({
      emailText: emailText
    });
  }

  render() {
    const { date, emailText } = this.state;
    
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Doomsday email generator!</h1>
          <h2>
            In case a meteor is coming to destroy the planet, we will help you compose an email to your boss about humanity's
            impending doom ... and why you won't make it to work!
          </h2>
        </header>
        <Datepicker date={date} onDateChange={this.dateChanged}/>
        <div className="emailText">
          {emailText}
        </div>
      </div>
    );
  }
}

export default App;
