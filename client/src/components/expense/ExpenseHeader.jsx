import { PlusCircle, Download } from "lucide-react";

export default function ExpenseHeader({ onExportExcel, onExportPdf }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Expense Management</h1>

        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Track and manage every expense efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 w-full lg:w-auto">
        <button
          onClick={onExportExcel}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white transition w-full sm:w-auto"
        >
          <Download size={18} />
          Export Excel
        </button>

        <button
          onClick={onExportPdf}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white transition w-full sm:w-auto"
        >
          <Download size={18} />
          Export PDF
        </button>

        <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white transition flex items-center justify-center gap-2 w-full sm:w-auto">
          <PlusCircle size={18} />
          Add Expense
        </button>
      </div>
    </div>
  );
}
