import { useState, useEffect } from "react";
import { getMyTeams } from 

export const useMyTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await getMyTeams();
      setTeams(response || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, refetch: fetchTeams };
};