import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import React from "react";

const Datepicker = props => {
    const { date, onDateChange } = props;

    return (
      <div>
        <label>Enter a date to check for incoming asteroids:</label>
        <Flatpickr value={date} onChange={date => onDateChange(date)} />
      </div>
    );
}

export default Datepicker;
