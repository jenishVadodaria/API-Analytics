/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import TimeFilter from "./TimeFilter";
import AnalyticsGraph from "./AnalyticsGraph";
import LogsTable from "./LogsTable/LogsTable";
import TotalCount from "./TotalCount";

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
    <>
      <div className="mb-5">
        <TimeFilter onTimeFilterChange={handleTimeFilterChange} />
      </div>
      <div className="d-flex flex-column-reverse flex-lg-row gap-5 ">
        <AnalyticsGraph range={timeFilter} refreshSignal={refreshSignal} />
        <TotalCount range={timeFilter} />
      </div>
      <div className="mt-5">
        <LogsTable refreshSignal={refreshSignal} range={timeFilter} />
      </div>
    </>
  );
};

export default AnalyticsGraphDashboard;
