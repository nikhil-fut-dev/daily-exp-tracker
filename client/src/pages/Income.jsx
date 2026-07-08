import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableSkeleton from "../components/common/TableSkeleton";

import {
  getIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../api/incomeApi";

import { exportToExcel } from "../utils/exportExcel";
import { exportToPDF } from "../utils/exportPdf";

import IncomeHeader from "../components/income/IncomeHeader";
import IncomeStats from "../components/income/IncomeStats";
import IncomeToolbar from "../components/income/IncomeToolbar";
import IncomeForm from "../components/income/IncomeForm";
import IncomeTable from "../components/income/IncomeTable";
import IncomePagination from "../components/income/IncomePagination";

export default function Income() {
  const [incomes, setIncomes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    setLoading(true);

    try {
      const data = await getIncomes();

      setIncomes(data.incomes || []);
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
      editingId ? "Updating Income..." : "Adding Income...",
    );

    try {
      if (isEditing) {
        await updateIncome(editingId, form);
        setEditingId(null);
      } else {
        await addIncome(form);
      }

      setForm({
        title: "",
        amount: "",
        category: "",
        note: "",
        date: "",
      });

      fetchIncome();

      toast.success(
        isEditing ? "Income Updated Successfully" : "Income Added Successfully",
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

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      fetchIncome();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIncome = [...incomes]
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "latest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "high") return b.amount - a.amount;
      if (sort === "low") return a.amount - b.amount;
      return 0;
    });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = filteredIncome.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredIncome.length / recordsPerPage);

  const handleExportExcel = () => {
    exportToExcel(incomes, "Income_Report");
  };

  const handleExportPdf = () => {
    exportToPDF(incomes, "Income Report", "Income_Report");
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
      <IncomeHeader
        onExportExcel={handleExportExcel}
        onExportPdf={handleExportPdf}
      />

      <IncomeStats incomes={incomes} />

      <IncomeToolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <IncomeForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <IncomeTable
        records={currentRecords}
        handleDelete={handleDelete}
        setEditingId={setEditingId}
        setForm={setForm}
      />

      <IncomePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
