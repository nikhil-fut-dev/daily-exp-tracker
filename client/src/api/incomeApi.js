import API from "./axios";

// Get All Income
export const getIncomes = async () => {
  const response = await API.get("/income");
  return response.data;
};

// Add Income
export const addIncome = async (data) => {
  const response = await API.post(
    "/income",
    data
  );

  return response.data;
};

// Delete Income
export const deleteIncome = async (id) => {
  const response = await API.delete(
    `/income/${id}`
  );

  return response.data;
};

// Update Income
export const updateIncome = async (
  id,
  incomeData
) => {
  const response =
    await API.put(
      `/income/${id}`,
      incomeData
    );

  return response.data;
};