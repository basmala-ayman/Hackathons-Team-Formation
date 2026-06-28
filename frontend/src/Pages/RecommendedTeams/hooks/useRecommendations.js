import { useEffect, useState } from "react";
import { getRecommendations } from "../../../services/recommendationService";

function useRecommendations() {
  const [recommendations, setRecommendations] = useState({
    myTeams: [],
    join: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        const data = await getRecommendations();

        setRecommendations({
          myTeams: data.myTeams || [],
          join: data.join || [],
        });
        console.log("rec",recommendations)
      } catch (err) {
        setError(err.message || "Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    };

   useEffect(() => {
    fetchRecommendations();
  }, []);
 

  return {
    recommendations,
    loading,
    error,
    refetchRecommendations: fetchRecommendations,
  };
}

export default useRecommendations;