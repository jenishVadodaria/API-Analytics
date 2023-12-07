/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

const TotalCount = ({
  range,
  refreshSignal,
}: {
  range: string;
  refreshSignal: boolean;
}) => {
  const [analyticsData, setAnalyticsData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}total-analytics?range=${range}`
        );

        setAnalyticsData(response.data.analyticsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range, refreshSignal]);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="d-flex total-count-section align-items-center flex-row flex-lg-column gap-3">
          <p className=" total-count-para">
            {"Total Unique Users: " + analyticsData.uniqueUserCount || ""}
          </p>
          <p className="total-count-para">
            {"Total Calls: " + analyticsData.totalCalls || ""}
          </p>
          <p className="total-count-para">
            {"Total Failures: " + analyticsData.totalFailures || ""}
          </p>
        </div>
      )}
    </>
  );
};

export default TotalCount;
