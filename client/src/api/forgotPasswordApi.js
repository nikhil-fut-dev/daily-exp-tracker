import API from "./axios";

export const sendOtp = async (email) => {
  const response = await API.post("/auth/forgot-password", { email });

  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await API.post("/auth/verify-otp", data);

  return response.data;
};

export const resetPassword = async (data) => {
  const response = await API.put("/auth/reset-password", data);

  return response.data;
};
