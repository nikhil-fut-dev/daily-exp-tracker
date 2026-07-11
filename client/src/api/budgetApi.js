import API from "./axios";

// Get All Budgets
export const getBudgets = async () => {
  const response = await API.get("/budget");

  return response.data;
};

// Add Budget
export const addBudget = async (data) => {
  const response = await API.post("/budget", data);

  return response.data;
};

// Update Budget
export const updateBudget = async (id, data) => {
  const response = await API.put(`/budget/${id}`, data);

  return response.data;
};

// Delete Budget
export const deleteBudget = async (id) => {
  const response = await API.delete(`/budget/${id}`);

  return response.data;
};
