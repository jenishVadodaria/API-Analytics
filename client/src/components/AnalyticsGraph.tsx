/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

const AnalyticsGraph = ({
  range,
  refreshSignal,
}: {
  range: string;
  refreshSignal: boolean;
}) => {
  const [chartData, setChartData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}analytics-data?range=${range}`
        );

        const formattedData = response.data.analyticsData.map((item: any) => ({
          ...item,
          time: new Date(item.time).toLocaleString(),
        }));

        setChartData(formattedData);
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
    <div style={{ width: "100%", height: "400%" }}>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="95%" height={400}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="failures"
              stroke="#DC143C"
              strokeWidth={2}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" hide={true} />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsGraph;
