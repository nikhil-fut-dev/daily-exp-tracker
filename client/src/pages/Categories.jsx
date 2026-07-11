import useCategories from "../hooks/useCategories";
import CategoryList from "../components/categories/CategoryList";
import { useState } from "react";
import toast from "react-hot-toast";

import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryForm from "../components/categories/CategoryForm";

import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

export default function Categories() {
  const { categories, loading, fetchCategories } = useCategories();

  const [editingCategory, setEditingCategory] = useState(null);

  const [open, setOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      setDeleting(true);

      await deleteCategory(selectedCategory._id);

      toast.success("Category Deleted Successfully");

      fetchCategories();

      setDeleteOpen(false);

      setSelectedCategory(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, form);

        toast.success("Category Updated Successfully");
      } else {
        await addCategory(form);

        toast.success("Category Added Successfully");

        setOpen(false);

        fetchCategories();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-white text-xl">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <CategoryHeader
        onAdd={() => {
          setEditingCategory(null);
          setOpen(true);
        }}
      />

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editingCategory={editingCategory}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
