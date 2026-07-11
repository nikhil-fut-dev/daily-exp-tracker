import API from "./axios";

// Get Categories
export const getCategories = async () => {
  const { data } = await API.get("/category");
  return data;
};

// Add Category
export const addCategory = async (form) => {
  const { data } = await API.post("/category", form);
  return data;
};

// Update Category
export const updateCategory = async (id, form) => {
  const { data } = await API.put(`/category/${id}`, form);
  return data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const { data } = await API.delete(`/category/${id}`);
  return data;
};
