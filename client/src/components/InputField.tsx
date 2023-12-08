/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        // window.alert("User logged successfully");
        toast.success("User logged successfully!");
      } else if (response.status === 400) {
        toast.error("User ID is required");
      } else {
        toast.error("Log API Failure");
      }
      setUserId("");
    } catch (error: any) {
      toast.error(error.response.data.message);
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
        Submit
      </button>
    </div>
  );
};

export default InputField;
