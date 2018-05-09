import "./Datepicker.css";
import "flatpickr/dist/themes/material_red.css";

import Flatpickr from "react-flatpickr";
import React from "react";

const Datepicker = props => {
  const { date, onDateChange } = props;

  return (
    <div className="datepicker">
      <label>Choose a date to check for incoming asteroids and generate your email:</label>
      <div className="datepicker-control">
        <Flatpickr
          value={date}
          options={{ dateFormat: "M j, Y" }}
          onChange={date => onDateChange(date)}
        />
      </div>
    </div>
  );
};

export default Datepicker;
