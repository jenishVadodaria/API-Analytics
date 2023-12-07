/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";

const TimeFilter = ({ onTimeFilterChange }: any) => {
  const [selectedRange, setSelectedRange] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClick = (range: string) => {
    setSelectedRange(range);

    if (range !== "custom") {
      onTimeFilterChange(range);
    }
  };

  const handleCustomRange = (date: Date, type: "start" | "end") => {
    date.setHours(0, 0, 0, 0);

    if (type === "start") {
      setStartDate(date);
      onTimeFilterChange(
        `custom&startDate=${date.toISOString()}&endDate=${endDate.toISOString()}`
      );
    } else {
      setEndDate(date);
      onTimeFilterChange(
        `custom&startDate=${startDate.toISOString()}&endDate=${date.toISOString()}`
      );
    }
  };

  const minimiumEndDate = () => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date;
  };

  return (
    <div className="time-filter-section">
      <p style={{ fontWeight: "bold", color: "#350e5f", fontSize: "1rem" }}>
        Time Filter:
      </p>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-primary btn-sm me-4"
          onClick={() => handleClick("last_24_hours")}
        >
          Last 24 hours
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm me-4"
          onClick={() => handleClick("last_7_days")}
        >
          Last 7 days
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => handleClick("custom")}
        >
          Custom range
        </button>
      </div>
      {selectedRange === "custom" && (
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => handleCustomRange(date, "start")}
            selectsStart
            maxDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => handleCustomRange(date, "end")}
            selectsEnd
            minDate={minimiumEndDate()}
            maxDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default TimeFilter;
