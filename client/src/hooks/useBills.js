import { useEffect, useState } from "react";
import { getBills } from "../api/billApi";

export default function useBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setLoading(true);

      const data = await getBills();

      setBills(data.bills || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return {
    bills,
    loading,
    fetchBills,
  };
}
