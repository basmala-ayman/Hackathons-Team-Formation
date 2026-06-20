import { useEffect, useState } from "react";
import { getExploreProjects } from "../../../services/projectService";

export const useExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await getExploreProjects();

        setProjects(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error, setProjects };
};