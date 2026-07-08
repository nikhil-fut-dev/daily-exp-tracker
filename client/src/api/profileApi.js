import API from "./axios";

export const updateProfile = async (formData) => {
  const response = await API.put("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
