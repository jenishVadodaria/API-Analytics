/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import TimeFilter from "./TimeFilter";
import AnalyticsGraph from "./AnalyticsGraph";

const AnalyticsGraphDashboard = ({
  refreshSignal,
}: {
  refreshSignal: boolean;
}) => {
  const [timeFilter, setTimeFilter] = useState("last_24_hours");

  const handleTimeFilterChange = (newTimeFilter: string) => {
    setTimeFilter(newTimeFilter);
  };

  return (
    <div className="d-flex flex-column-reverse flex-lg-row gap-5 ">
      <AnalyticsGraph range={timeFilter} refreshSignal={refreshSignal} />
      <TimeFilter onTimeFilterChange={handleTimeFilterChange} />
    </div>
  );
};

export default AnalyticsGraphDashboard;
