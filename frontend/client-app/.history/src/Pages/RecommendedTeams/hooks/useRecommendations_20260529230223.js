import { useEffect, useState } from "react";
import { getRecommendations } from "../";

function useRecommendations() {
  const [recommendations, setRecommendations] = useState({
    myTeams: [],
    join: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        const data = await getRecommendations();

        setRecommendations({
          myTeams: data.myTeams || [],
          join: data.join || [],
        });
      } catch (err) {
        setError(
          err.message || "Failed to fetch recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return {
    recommendations,
    loading,
    error,
  };
}

export default useRecommendations;