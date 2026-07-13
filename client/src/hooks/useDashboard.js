import { useEffect, useState, useCallback } from "react";

import { getIncomes } from "../api/incomeApi";
import { getExpenses } from "../api/expenseApi";
import { getBudgets } from "../api/budgetApi";
import { getGoals } from "../api/goalApi";
import { getBills } from "../api/billApi";

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    saving: 0,

    incomes: [],
    expenses: [],
    budgets: [],
    goals: [],
    bills: [],
  });

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [incomeRes, expenseRes, budgetRes, goalRes, billRes] =
        await Promise.all([
          getIncomes(),
          getExpenses(),
          getBudgets(),
          getGoals(),
          getBills(),
        ]);

      const incomes = incomeRes?.incomes || [];
      const expenses = expenseRes?.expenses || [];
      const budgets = budgetRes?.budgets || [];
      const goals = goalRes?.goals || [];
      const bills = billRes?.bills || [];

      const totalIncome = incomes.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

      const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

      const saving = totalIncome - totalExpense;

      setDashboard({
        income: totalIncome,
        expense: totalExpense,
        balance: saving,
        saving,

        incomes,
        expenses,
        budgets,
        goals,
        bills,
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    loading,
    dashboard,
    refreshDashboard: fetchDashboard,
  };
}
