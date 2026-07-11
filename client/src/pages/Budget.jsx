import { useState } from "react";

import useBudgets from "../hooks/useBudgets";

import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetSummary from "../components/budget/BudgetSummary";
import BudgetList from "../components/budget/BudgetList";
import BudgetForm from "../components/budget/BudgetForm";

export default function Budgets() {
  const { budgets, loading } = useBudgets();

  const [open, setOpen] = useState(false);

  const [editingBudget, setEditingBudget] = useState(null);

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setOpen(true);
  };

  const handleDelete = (budget) => {
    console.log("Delete", budget);
  };

  return (
  <div className="space-y-6">

    <BudgetHeader
      onAdd={() => {
        setEditingBudget(null);
        setOpen(true);
      }}
    />

    <BudgetSummary budgets={budgets} />

    {loading ? (
      <p className="text-slate-400">Loading...</p>
    ) : (
      <BudgetList
        budgets={budgets}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )}

    {/* 👇 Yahi paste karna hai */}
    <BudgetForm
      open={open}
      onClose={() => setOpen(false)}
      editingBudget={editingBudget}
      onSubmit={(data) => console.log(data)}
    />

  </div>
);
}
