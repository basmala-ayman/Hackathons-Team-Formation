import { useState } from "react";
import { markInterestInHackathon } from "../../../services/interestService";

function useHackathonInterest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerInterest = async (hackathonId) => {
    try {
      setLoading(true);
      setError("");

      const response = await markInterestInHackathon(hackathonId);

      return response;
    } catch (err) {
      con
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

export default useHackathonInterest;