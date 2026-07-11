import { useEffect, useState } from "react";
import { getBudgets } from "../api/budgetApi";

export default function useBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    try {
      setLoading(true);

      const response = await getBudgets();

      setBudgets(response.budgets || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return {
    budgets,
    loading,
    fetchBudgets,
    setBudgets,
  };
}
