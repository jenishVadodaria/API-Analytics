/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./logstable.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

const LogsTable = ({
  refreshSignal,
  range,
}: {
  refreshSignal: boolean;
  range: string;
}) => {
  const [logTableData, setLogTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}logs?range=${range}&offset=${page * 10}&limit=10`
        );

        setLogTableData(response.data.logs);
        setTotalPages(Math.ceil(response.data.totalCount / 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshSignal, page, range]);

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div id="logsTable">
      {logTableData?.length === 0 ? (
        <>
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
          </table>
          <div>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: "#350e5f",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              No Data Available
            </p>
          </div>
        </>
      ) : (
        <>
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
                  <td className="text-center">{page * 10 + index + 1}.</td>
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
                    {/* <p className="logs-data p-0">
                      {"Url: " + item?.request?.url}
                    </p>
                    <p className="logs-data p-0">
                      {"Headers-host: " + item?.request?.headers.host}
                    </p>
                    <p className="logs-data p-0">
                      {"Headers-referer: " + item?.request?.headers.referer}
                    </p> */}
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
          <div className="d-flex justify-content-end my-3">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="btn btn-primary me-4"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={page >= totalPages - 1}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LogsTable;
