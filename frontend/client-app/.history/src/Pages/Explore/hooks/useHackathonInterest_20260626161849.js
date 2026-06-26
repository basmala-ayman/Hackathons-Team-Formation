import { useState } from "react";
import { markInterestInHackathon , removeHackathonInterest } from "../../../services/interestService";

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
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const removeInterest = async (hackathonId) => {
    try {
      setLoading(true);
      setError("");
      return await removeHackathonInterest(hackathonId);
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

export default useHackathonInterest;