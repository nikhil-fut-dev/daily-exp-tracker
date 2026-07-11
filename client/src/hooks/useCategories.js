import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data.categories || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    setCategories,
  };
}