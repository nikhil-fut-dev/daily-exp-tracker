import { BarChart3, Download } from "lucide-react";

export default function ReportsHeader({ onExport }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-white">
            <BarChart3 size={38} />
            Reports & Analytics
          </h1>

          <p className="mt-3 text-indigo-100">
            Analyze your income, expenses and financial growth with interactive
            charts.
          </p>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-2xl bg-white/15 px-6 py-3 text-white backdrop-blur hover:bg-white/25 transition"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>
    </div>
  );
}
