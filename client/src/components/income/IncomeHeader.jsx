import { PlusCircle, Download } from "lucide-react";

export default function IncomeHeader({ onExportExcel, onExportPdf }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Income Management</h1>

        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Manage and monitor all your income sources.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
        <button
          onClick={onExportExcel}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white transition w-full sm:w-auto"
        >
          <Download size={18} />
          Export Excel
        </button>

        <button
          onClick={onExportPdf}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white transition"
        >
          <Download size={18} />
          Export PDF
        </button>

        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white transition w-full sm:w-auto">
          <PlusCircle size={18} />
          Add Income
        </button>
      </div>
    </div>
  );
}
