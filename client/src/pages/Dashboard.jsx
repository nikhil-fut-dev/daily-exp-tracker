import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import DashboardSkeleton from "../components/common/DashboardSkeleton";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCards from "../components/dashboard/SummaryCards";
import MonthlyChart from "../components/dashboard/MonthlyChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import QuickStats from "../components/dashboard/QuickStats";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="p-8">
        <DashboardSkeleton />
      </div>
    );
  }

  const categoryData = Object.entries(dashboard.expenseCategories || {}).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <SummaryCards summary={dashboard.summary} />

      <div className="grid xl:grid-cols-2 gap-6">
        <MonthlyChart data={dashboard.monthlyChart} />

        <CategoryChart data={categoryData} />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentTransactions transactions={dashboard.recentTransactions} />
        </div>

        <QuickStats
          incomeCount={dashboard.incomeCount}
          expenseCount={dashboard.expenseCount}
        />
      </div>
    </div>
  );
}
