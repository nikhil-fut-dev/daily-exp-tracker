import { useState } from "react";

import useBudgets from "../hooks/useBudgets";

import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetSummary from "../components/budget/BudgetSummary";
import BudgetList from "../components/budget/BudgetList";
import BudgetForm from "../components/budget/BudgetForm";
import DeleteBudgetModal from "../components/budget/DeleteBudgetModal";

import { addBudget, updateBudget, deleteBudget } from "../api/budgetApi";

import toast from "react-hot-toast";

export default function Budgets() {
  const { budgets, loading, fetchBudgets } = useBudgets();

  const [open, setOpen] = useState(false);

  const [editingBudget, setEditingBudget] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setOpen(true);
  };

  const handleDelete = (budget) => {
    setSelectedBudget(budget);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBudget(selectedBudget._id);

      toast.success("Budget Deleted Successfully");

      setDeleteOpen(false);

      setSelectedBudget(null);

      await fetchBudgets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete Failed");
    }
  };

  const handleSubmit = async (form) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget._id, form);

        toast.success("Budget Updated Successfully");
      } else {
        await addBudget(form);

        toast.success("Budget Created Successfully");
      }

      setOpen(false);
      setEditingBudget(null);

      await fetchBudgets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <BudgetHeader
        onAdd={() => {
          setEditingBudget(null);
          setOpen(true);
        }}
      />

      <BudgetSummary budgets={budgets} />

      {/* Placeholder */}

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (
        <BudgetList
          budgets={budgets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BudgetForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingBudget(null);
        }}
        editingBudget={editingBudget}
        onSubmit={handleSubmit}
      />

      <DeleteBudgetModal
        open={deleteOpen}
        budget={selectedBudget}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
