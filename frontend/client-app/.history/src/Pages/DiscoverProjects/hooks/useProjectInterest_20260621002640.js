import { useState } from "react";
import { markInterestInProject } from "../../../services/projectService";

function useProjectInterest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerInterest = async (hackathonId) => {
    try {
      setLoading(true);
      setError("");

      const response = await markInterestInProject(hackathonId);

      return response;
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