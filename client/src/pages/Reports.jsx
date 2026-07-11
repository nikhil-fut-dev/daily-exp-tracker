import ReportsHeader from "../components/reports/ReportsHeader";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/reports/IncomeExpenseChart";
import CategoryPieChart from "../components/reports/CategoryPieChart";
import MonthlyBarChart from "../components/reports/MonthlyBarChart";
import useReports from "../hooks/useReports";

export default function Reports() {
  const { report, loading } = useReports();

  return (
    <div className="space-y-6">
      <ReportsHeader onExport={() => console.log("Export")} />

      <ReportsSummary report={report} />

      {/* Income vs Expense Chart */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-xl font-bold text-white">Income vs Expense</h2>
          <IncomeExpenseChart report={report} />
      </div>

      {/* Expense Categories */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-xl font-bold text-white">
          <CategoryPieChart report={report} />
        </h2>

        
          <MonthlyBarChart report={report} />
        
      </div>
    </div>
  );
}
