import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableSkeleton from "../components/common/TableSkeleton";

import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../api/expenseApi";

import { exportToExcel } from "../utils/exportExcel";
import { exportToPDF } from "../utils/exportPdf";

import ExpenseHeader from "../components/expense/ExpenseHeader";
import ExpenseStats from "../components/expense/ExpenseStats";
import ExpenseToolbar from "../components/expense/ExpenseToolbar";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseTable from "../components/expense/ExpenseTable";
import ExpensePagination from "../components/expense/ExpensePagination";

import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    note: "",
    date: "",
  });

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [selectedExpenseTitle, setSelectedExpenseTitle] = useState("");

  const [deleting, setDeleting] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();

      setExpenses(data.expenses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = !!editingId;

    const toastId = toast.loading(
      isEditing ? "Updating Expense..." : "Adding Expense...",
    );

    try {
      if (isEditing) {
        await updateExpense(editingId, form);
        setEditingId(null);
      } else {
        await addExpense(form);
      }

      setForm({
        title: "",
        amount: "",
        category: "",
        paymentMethod: "",
        note: "",
        date: "",
      });

      fetchExpense();

      toast.success(
        isEditing
          ? "Expense Updated Successfully"
          : "Expense Added Successfully",
        {
          id: toastId,
        },
      );
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Operation Failed", {
        id: toastId,
      });
    }
  };

  const handleDelete = (id, title) => {
    setSelectedExpenseId(id);
    setSelectedExpenseTitle(title);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedExpenseId) return;

    try {
      setDeleting(true);

      await deleteExpense(selectedExpenseId);

      toast.success("Expense Deleted Successfully");

      fetchExpense();
      setDeleteOpen(false);
      setSelectedExpenseId(null);
      setSelectedExpenseTitle("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  const filteredExpense = [...expenses]
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.date) - new Date(a.date);
      }

      if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sort === "high") {
        return b.amount - a.amount;
      }

      if (sort === "low") {
        return a.amount - b.amount;
      }

      return 0;
    });

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = filteredExpense.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredExpense.length / recordsPerPage);

  const handleExport = () => {
    exportToExcel(expenses, "Expense_Report");
  };

  const handlePdf = () => {
    exportToPDF(expenses, "Expense Report", "Expense_Report");
  };

  if (loading) {
    return (
      <div className="p-8">
        <TableSkeleton rows={6} columns={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ExpenseHeader onExportExcel={handleExport} onExportPdf={handlePdf} />

      <ExpenseStats expenses={expenses} />

      <ExpenseToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <ExpenseForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <ExpenseTable
        records={currentRecords}
        handleDelete={handleDelete}
        setEditingId={setEditingId}
        setForm={setForm}
      />

      <ExpensePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Expense"
        message={`Are you sure you want to delete "${selectedExpenseTitle}"?`}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedExpenseId(null);
          setSelectedExpenseTitle("");
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
