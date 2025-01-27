import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Dashboard = () => {
  const [closeData, setCloseData] = useState({
    location: "",
    date: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  // Fetch statistics data (e.g., total bookings, users, revenue) from the API
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCloseData({ ...closeData, [name]: value });
  };

  const handleCloseDay = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/close_day`, closeData);
      setResponseMessage(response.data.message);
      // Optionally, re-fetch the statistics after closing the day
      fetchStatistics();
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Load the statistics when the component mounts
  React.useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Form to close the day */}
      <form onSubmit={handleCloseDay} className="mt-6">
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={closeData.location}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </label>
        <label className="ml-4">
          Date:
          <input
            type="date"
            name="date"
            value={closeData.date}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </label>
        <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded">
          Close Day
        </button>
      </form>

      {responseMessage && <p className="mt-4">{responseMessage}</p>}

      {/* Display Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl font-bold">{statistics.totalBookings}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold">{statistics.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">${statistics.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
