import { useState, useEffect, useMemo } from "react";
import { getBasicUsers } from "../../../services/userService";
import { getHackathonNames } from "../../../services/hackathonService";
import { createTeam } from "../../../services/teamService";
import { INITIAL_FORM_DATA } from "../CreateTeam.constants";

//function to get saved user's data
const getSavedData = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export function useCreateTeamForm() {
  //states
  const [users, setUsers] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [currentStep, setCurrentStep] = useState(() =>
    Number(getSavedData("Current_step", 1)),
  );

  const [formData, setFormData] = useState(() =>
    getSavedData("Team_Data", INITIAL_FORM_DATA),
  );

  // Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, hackathonsRes] = await Promise.all([
          getBasicUsers(),
          getHackathonNames(),
        ]);
        setUsers(usersRes);
        setHackathons(hackathonsRes);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {};
}

