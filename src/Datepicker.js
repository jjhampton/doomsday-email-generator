import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import React, { Component } from "react";

class Datepicker extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  handleChange(date) {
    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <p>Enter the date that you'll be unavailable for work.</p>
        <Flatpickr
          value={date}
          onChange={date => {
            this.handleChange(date)
          }}
        />
      </div>
    );
  }
}

export default Datepicker;
