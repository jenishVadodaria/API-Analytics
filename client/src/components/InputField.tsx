/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

const InputField = () => {
  const [userId, setUserId] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(`${API_URL}log`, { userId });

      if (response.status === 200) {
        window.alert("User logged successfully");
      } else {
        window.alert("Log API Failure");
      }
      setUserId("");
    } catch (error) {
      window.alert("Log API Failure");
      console.error("Error logging user:", error);
      setUserId("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Enter User ID"
        value={userId}
        onChange={handleInputChange}
        style={{ flex: "1 1 auto" }}
      />
      <button
        className="btn btn-primary btn-font"
        type="button"
        onClick={handleButtonClick}
        style={{ flex: "0 0 auto" }}
      >
        Hit Api
      </button>
    </div>
  );
};

export default InputField;
