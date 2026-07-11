import API from "./axios";

// Get Reports
export const getReport = async () => {
  const response = await API.get("/report");
  return response.data;
};