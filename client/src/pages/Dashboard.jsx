import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardGrid from "../components/dashboard/DashboardGrid";
import KPISection from "../components/dashboard/cards/KPISection";

import useDashboard from "../hooks/useDashboard";

import IncomeExpenseChart from "../components/dashboard/charts/IncomeExpenseChart";
import ExpensePieChart from "../components/dashboard/charts/ExpensePieChart";
import RecentTransactions from "../components/dashboard/widgets/RecentTransactions";
import GoalProgress from "../components/dashboard/widgets/GoalProgress";
import SmartInsights from "../components/dashboard/widgets/SmartInsights";
//import ActivityTimeline from "../components/dashboard/widgets/ActivityTimeline";
import BudgetOverview from "../components/dashboard/widgets/BudgetOverview";

export default function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <div className="p-10 text-slate-400">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardGrid>
        <KPISection dashboard={dashboard} />

        <IncomeExpenseChart dashboard={dashboard} />

        <ExpensePieChart dashboard={dashboard} />

        <RecentTransactions dashboard={dashboard} />

        <GoalProgress dashboard={dashboard} />

        <div className="col-span-12 xl:col-span-6">
          <SmartInsights dashboard={dashboard} />
        </div>

        {/*<div className="col-span-12 xl:col-span-6">
          <ActivityTimeline dashboard={dashboard} />
        </div>*/}

        <div className="col-span-12 xl:col-span-6">
          <BudgetOverview dashboard={dashboard} />
        </div>
      </DashboardGrid>
    </div>
  );
}
