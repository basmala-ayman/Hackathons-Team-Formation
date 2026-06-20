import { useState } from "react";
import { markInterestInProject } from "../../../services/projectService";

function useProjectInterest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerInterest = async (projectId) => {
    try {
      setLoading(true);
      setError("");

      const response = await markInterestInProject(projectId);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerInterest,
    loading,
    error,
  };
}

export default useProjectInterest;