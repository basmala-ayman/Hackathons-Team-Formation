import { useState } from "react";
import { markInterestInProject } from "../../../services/projectService";

function useProjectInterest() {
  const [loadingId, setLoadingId] = useState(false);
  const [error, setError] = useState("");

  const registerInterest = async (projectId) => {
    try {
      setLoadingId(projectId);
      setError("");

      const response = await markInterestInProject(projectId);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadingId(null);
    }
  };

  return {
    registerInterest,
    loadingId,
    error,
  };
}

export default useProjectInterest;