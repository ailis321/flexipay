import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div>
      <DatePicker
        id="start-date-picker"
        selected={startDate}
        onChange={setStartDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="d MMMM, yyyy"
        data-testid="start-date-picker"
      />
      <DatePicker
        id="end-date-picker"
        selected={endDate}
        onChange={setEndDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="d MMMM, yyyy"
        data-testid="end-date-picker"
      />
    </div>
  );
};

export default DateRangePicker;
