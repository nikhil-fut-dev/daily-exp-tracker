import API from "./axios";

export const getDashboard = async (page = 1, limit = 5) => {
  const response = await API.get(
    `/dashboard?page=${page}&limit=${limit}`
  );

  return response.data;
};