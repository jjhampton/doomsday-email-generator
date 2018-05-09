import React, { Component } from "react";
import Datepicker from "./Datepicker";
import Email from "./Email";
import moment from "moment";
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
    this.fetchAsteroidData();
  };

  fetchAsteroidData = () => {
    this.setState({
      isLoading: true
    });

    const startDate = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    const endDate = moment(new Date(this.state.date)).format("YYYY-MM-DD");
    const apiKey = "5y5LZqDuL4agOD23pSO0bCtxQUTHWyf2qLcfVjMC";

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(result => {
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

    return <div className="app">
        <header className="app-header">
          <div className="app-logo" />
          <h1 className="app-title">Doomsday Email Generator</h1>
          <h2 className="app-description">
            If an asteroid is coming to destroy the planet, we will help you
            compose an email warning your boss about humanity's impending doom
            ... and why you won't make it to work!
          </h2>
        </header>
        <section className="app-content">
          <Datepicker date={date} onDateChange={this.dateChanged} />
          {date && !isLoading && <Email asteroids={potentiallyHazardousAsteroids} />}
        </section>
      </div>;
  }
}

export default App;
