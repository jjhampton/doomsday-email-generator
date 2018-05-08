import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import React from "react";

const Datepicker = props => {
    const { date, onDateChange } = props;

    return (
      <div>
        <p>Enter the date that you'll be unavailable for work.</p>
        <Flatpickr value={date} onChange={date => onDateChange(date)} />
      </div>
    );
}

export default Datepicker;
