import { useEffect, useState } from "react";
import { getRecommendations } from "../../../";

function useRecommendations(tab = "all") {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        const data = await getRecommendations(tab);

        setRecommendations(data.data);
      } catch (err) {
        setError(
          err.message || "Failed to fetch recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [tab]);

  return {
    recommendations,
    loading,
    error,
  };
}

export default useRecommendations;