import { useState } from "react";
import { markInterestInProject , removeInterestFromProject } from "../../../services/projectService";

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

