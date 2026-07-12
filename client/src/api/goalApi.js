import API from "./axios";

// Get All Goals
export const getGoals = async () => {
  const res = await API.get("/goals");
  return res.data;
};

// Add Goal
export const addGoal = async (data) => {
  const res = await API.post("/goals", data);
  return res.data;
};

// Update Goal
export const updateGoal = async (id, data) => {
  const res = await API.put(`/goals/${id}`, data);
  return res.data;
};

// Delete Goal
export const deleteGoal = async (id) => {
  const res = await API.delete(`/goals/${id}`);
  return res.data;
};

// Add Saving
export const addSaving = async (id, amount) => {
  const res = await API.patch(`/goals/${id}/add-saving`, {
    amount,
  });

  return res.data;
};
