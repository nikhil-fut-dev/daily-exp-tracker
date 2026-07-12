import { useState } from "react";

import toast from "react-hot-toast";
import { useNotification } from "../context/NotificationContext";

import useGoals from "../hooks/useGoals";

import { addGoal, updateGoal, addSaving, deleteGoal } from "../api/goalApi";

import GoalHeader from "../components/goals/GoalHeader";
import GoalSummary from "../components/goals/GoalSummary";
import GoalList from "../components/goals/GoalList";
import GoalForm from "../components/goals/GoalForm";
import AddSavingModal from "../components/goals/AddSavingModal";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

export default function Goals() {
  const { goals, loading, fetchGoals } = useGoals();

  const { refreshNotifications } = useNotification();

  const [open, setOpen] = useState(false);

  const [editingGoal, setEditingGoal] = useState(null);

  const [savingOpen, setSavingOpen] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setOpen(true);
  };

  const handleDelete = (goal) => {
    setSelectedGoal(goal);
    setDeleteOpen(true);
  };

  const handleSaving = (goal) => {
    setSelectedGoal(goal);
    setSavingOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal._id, form);

        toast.success("Goal Updated Successfully");
      } else {
        await addGoal(form);

        toast.success("Goal Created Successfully");
      }

      setOpen(false);
      setEditingGoal(null);

      await fetchGoals();

      // 🔔 Refresh Notifications
      await refreshNotifications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddSaving = async (amount) => {
    if (!selectedGoal) return;

    try {
      await addSaving(selectedGoal._id, amount);

      toast.success("Saving Added Successfully");

      setSavingOpen(false);
      setSelectedGoal(null);

      await fetchGoals();

      // 🔔 Goal Completed Notification
      await refreshNotifications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!selectedGoal) return;

    try {
      setDeleting(true);

      await deleteGoal(selectedGoal._id);

      toast.success("Goal Deleted Successfully");

      setDeleteOpen(false);
      setSelectedGoal(null);

      await fetchGoals();

      // 🔔 Refresh Notifications
      await refreshNotifications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <GoalHeader
        onAdd={() => {
          setEditingGoal(null);
          setOpen(true);
        }}
      />

      <GoalSummary goals={goals} />

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (
        <GoalList
          goals={goals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSaving={handleSaving}
        />
      )}

      <GoalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editingGoal={editingGoal}
      />

      <AddSavingModal
        open={savingOpen}
        onClose={() => {
          setSavingOpen(false);
          setSelectedGoal(null);
        }}
        goal={selectedGoal}
        onSubmit={handleAddSaving}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Goal"
        message={`Delete "${selectedGoal?.title}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedGoal(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
