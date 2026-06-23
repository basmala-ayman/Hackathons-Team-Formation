import { useState } from "react";
import { markInterestInProject } from "../../../services/projectService";

export const useProjectInterest=()=> {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  const registerInterest = async (projectId) => {
    try {
      setLoadingId(projectId);
      setError("");

      const response = await markInterestInProject(projectId);
      // console.log("response:" , response)

      return response;
    } catch (err) {
      
      throw (err);
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

