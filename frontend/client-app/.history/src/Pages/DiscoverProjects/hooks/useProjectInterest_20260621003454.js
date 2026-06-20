import { useState } from "react";
import { markInterestInProject } from "../../../services/projectService";

function useProjectInterest() {
  const [loadingId, setLoadingId] = useState(false);
  const [error, setError] = useState("");

  const registerInterest = async (projectId) => {
    try {
      setLoadingId(true);
      setError("");

      const response = await markInterestInProject(projectId);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadingId(false);
    }
  };

  return {
    registerInterest,
    loading,
    error,
  };
}

export default useProjectInterest;