import { useEffect, useState } from "react";
import { getGoals } from "../api/goalApi";

export default function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      setLoading(true);

      const data = await getGoals();

      setGoals(data.goals || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    loading,
    fetchGoals,
    setGoals,
  };
}
