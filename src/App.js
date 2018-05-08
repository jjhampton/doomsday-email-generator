import React, { Component } from "react";
import Datepicker from "./Datepicker";
import Email from "./Email";
import moment from "moment";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      isLoading: false,
      potentiallyHazardousAsteroids: []
    };
  }

  dateChanged = date => {
    this.setState({ date });
    this.fetchMetorData();
  };

  fetchMetorData = () => {
    this.setState({
      isLoading: true
    });

    const startDate = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    const endDate = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    const apiKey = "DEMO_KEY"; // replace with NASA Api Key: https://api.nasa.gov/index.html#apply-for-an-api-key

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const potentiallyHazardousAsteroids = result.near_earth_objects[
          startDate
        ].filter(x => x.is_potentially_hazardous_asteroid);

        this.setState({
          potentiallyHazardousAsteroids: potentiallyHazardousAsteroids,
          isLoading: false
        });
      });
  };

  render() {
    const { date, isLoading, potentiallyHazardousAsteroids } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Doomsday Email Generator</h1>
          <h2>
            If an asteroid is coming to destroy the planet, we will help you
            compose an email to your boss about humanity's impending doom ...
            and why you won't make it to work!
          </h2>
        </header>
        <Datepicker date={date} onDateChange={this.dateChanged} />
        {date &&
          !isLoading && <Email asteroids={potentiallyHazardousAsteroids} />}
      </div>
    );
  }
}

export default App;
