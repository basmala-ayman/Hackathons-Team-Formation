import { useEffect, useState } from "react";
import { getAllHackathons } from "../../../services/hackathonService";

function useHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);

        const data = await getAllHackathons();
        console.log(data);

        setHackathons(data);
      } catch (err) {
        setError(err.message || "Failed to fetch hackathons");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  return {
    hackathons,
    loading,
    error,
  };
}

export default useHackathons;
