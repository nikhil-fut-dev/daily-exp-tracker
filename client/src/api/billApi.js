import API from "./axios";

// Get All Bills
export const getBills = async () => {
  const res = await API.get("/bills");
  return res.data;
};

// Add Bill
export const addBill = async (data) => {
  const res = await API.post("/bills", data);
  return res.data;
};

// Update Bill
export const updateBill = async (id, data) => {
  const res = await API.put(`/bills/${id}`, data);
  return res.data;
};

// Delete Bill
export const deleteBill = async (id) => {
  const res = await API.delete(`/bills/${id}`);
  return res.data;
};
