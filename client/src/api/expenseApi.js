import API from "./axios";

// Get All Expenses
export const getExpenses = async () => {
  const response = await API.get("/expense");
  return response.data;
};

// Add Expense
export const addExpense = async (expenseData) => {
  const response = await API.post("/expense", expenseData);

  return response.data;
};

// Delete Expense
export const deleteExpense = async (id) => {
  const response = await API.delete(`/expense/${id}`);

  return response.data;
};

// Update Expense
export const updateExpense = async (id, expenseData) => {
  const response = await API.put(`/expense/${id}`, expenseData);

  return response.data;
};
