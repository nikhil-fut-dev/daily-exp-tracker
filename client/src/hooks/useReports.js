import { useEffect, useState } from "react";
import { getReport } from "../api/reportApi";

export default function useReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const data = await getReport();

      setReport(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return {
    report,
    loading,
    fetchReport,
  };
}
