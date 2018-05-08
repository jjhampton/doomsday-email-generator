import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import React from "react";

const Datepicker = props => {
  const { date, onDateChange } = props;

  return (
    <div>
      <label>Choose a date to check for incoming asteroids:</label>
      <div>
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
