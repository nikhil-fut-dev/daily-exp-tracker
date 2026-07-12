import { useState } from "react";
import useBills from "../hooks/useBills";

import { addBill, updateBill, deleteBill } from "../api/billApi";
import toast from "react-hot-toast";
import { useNotification } from "../context/NotificationContext";

import { exportToExcel } from "../utils/exportExcel";
import { exportToPDF } from "../utils/exportPdf";

import BillSummary from "../components/bills/BillSummary";
import BillForm from "../components/bills/BillForm";
import BillHeader from "../components/bills/BillHeader";
import BillList from "../components/bills/BillList";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

export default function Bills() {
  const { bills, loading, fetchBills } = useBills();

  const { refreshNotifications } = useNotification();

  const [open, setOpen] = useState(false);

  const [editingBill, setEditingBill] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedBill, setSelectedBill] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const handleExportExcel = () => {
    exportToExcel(bills, "Bills_Report");
  };

  const handleExportPdf = () => {
    exportToPDF(bills, "Bills Report", "Bills_Report");
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
    setOpen(true);
  };

  const handleDelete = (bill) => {
    setSelectedBill(bill);
    setDeleteOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingBill) {
        await updateBill(editingBill._id, form);

        toast.success("Bill Updated Successfully");
      } else {
        await addBill(form);

        toast.success("Bill Added Successfully");
      }

      await fetchBills();

      // 🔔 Refresh Notifications
      await refreshNotifications();

      setOpen(false);

      setEditingBill(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const confirmDelete = async () => {
    if (!selectedBill) return;

    try {
      setDeleting(true);

      await deleteBill(selectedBill._id);

      toast.success("Bill Deleted Successfully");

      await fetchBills();

      // 🔔 Refresh Notifications
      await refreshNotifications();

      setDeleteOpen(false);

      setSelectedBill(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <BillHeader
        onAdd={() => {
          setEditingBill(null);
          setOpen(true);
        }}
        onExportExcel={handleExportExcel}
        onExportPdf={handleExportPdf}
      />

      <BillSummary bills={bills} />

      <BillList bills={bills} onEdit={handleEdit} onDelete={handleDelete} />

      <BillForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingBill(null);
        }}
        onSubmit={handleSubmit}
        editingBill={editingBill}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Bill"
        message={`Delete "${selectedBill?.title}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedBill(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
