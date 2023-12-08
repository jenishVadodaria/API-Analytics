/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import AnalyticsGraphDashboard from "./components/AnalyticsGraphDashboard";
import InputField from "./components/InputField";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

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
          color: "#350e5f",
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
            Refresh
          </button>
        </div>
      </div>

      <div className=" mb-5 ">
        <AnalyticsGraphDashboard refreshSignal={refreshSignal} />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
