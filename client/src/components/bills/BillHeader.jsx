import { Plus, Receipt, FileSpreadsheet, FileText } from "lucide-react";

export default function BillHeader({ onAdd, onExportExcel, onExportPdf }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <Receipt className="text-indigo-400" size={34} />
          Bills & Recurring Payments
        </h1>

        <p className="mt-2 text-slate-400">
          Track all recurring and one-time bills.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onExportExcel}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700 transition"
        >
          <FileSpreadsheet size={18} />
          Excel
        </button>

        <button
          onClick={onExportPdf}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700 transition"
        >
          <FileText size={18} />
          PDF
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Bill
        </button>
      </div>
    </div>
  );
}
