/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import AnalyticsGraphDashboard from "./components/AnalyticsGraphDashboard";
import InputField from "./components/InputField";
import LogsTable from "./components/LogsTable/LogsTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refreshSignal, setRefreshSignal] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefreshSignal(!refreshSignal);
  };
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "#CC66FF",
        }}
        className="mb-4"
      >
        Developer Analytics Dashboard
      </h1>
      <div className=" mb-5 d-flex justify-content-center  gap-5">
        <InputField />
        <div>
          <button
            className="btn btn-primary btn-font"
            type="button"
            onClick={handleRefresh}
          >
            Refresh Logs
          </button>
        </div>
      </div>

      <div className=" mb-5 ">
        <AnalyticsGraphDashboard refreshSignal={refreshSignal} />
      </div>

      <LogsTable refreshSignal={refreshSignal} />
    </div>
  );
}

export default App;
