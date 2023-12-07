/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./logstable.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

const LogsTable = ({ refreshSignal }: { refreshSignal: boolean }) => {
  const [logTableData, setLogTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}logs`);

        setLogTableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshSignal]);

  return (
    <div id="logsTable">
      {logTableData?.length === 0 ? (
        <p
          style={{
            fontWeight: "bold",
            color: "#CC66FF",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Log Table will be available after you add some logs
        </p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>User ID</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Error message</th>
              <th>Request</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {logTableData?.map((item, index) => (
              <tr key={item._id}>
                <td className="text-center">{index + 1}.</td>
                <td>
                  <p className="logs-data p-0">{item?.userName}</p>
                </td>
                <td>
                  <p className="logs-data p-0">
                    {new Date(item?.timestamp).toLocaleString()}
                  </p>
                </td>
                <td>
                  <p className="logs-data p-0">{item?.status}</p>
                </td>
                <td>
                  <p className="logs-data p-0">
                    {item?.errorMessage ? item?.errorMessage : "-"}
                  </p>
                </td>
                <td>
                  <p className="logs-data p-0">
                    {"Method: " + item?.request?.method}
                  </p>
                  <p className="logs-data p-0">
                    {"Url: " + item?.request?.url}
                  </p>
                  <p className="logs-data p-0">
                    {"Headers-host: " + item?.request?.headers.host}
                  </p>
                  <p className="logs-data p-0">
                    {"Headers-referer: " + item?.request?.headers.referer}
                  </p>
                  <p className="logs-data p-0">
                    {"Body: " + item?.request?.body.userId}
                  </p>
                </td>

                <td>
                  <p className="logs-data  p-0">
                    {"Status Code: " + item?.response.statusCode}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsTable;
