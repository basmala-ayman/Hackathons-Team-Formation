import { useState, useEffect, useMemo } from "react";
import { getBasicUsers } from "../../../services/userService";
import { getHackathonNames } from "../../../services/hackathonService";
import { createTeam } from "../../../services/teamService";
import { INITIAL_FORM_DATA } from "../CreateTeam.constants";
import toast from "react-hot-toast";


//function to get saved user's data
const getSavedData = (key, defaultValue) => {
  const saved = sessionStorage.getItem(key);
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
    Number(getSavedData("current_step", 1)),
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

  //format data returned from api for Select fields (for invite users and hackathons)
  //store data as (value  , label) format for SELECT element
  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: `${user.name} (${user.email})`,
    }));
  }, [users]);

  const hackathonList = useMemo(() => {
    return hackathons.map((name) => ({
      value: name,
      label: name,
    }));
  }, [hackathons]);

  //save data inside sessionStorage =
  useEffect(() => {
    sessionStorage.setItem("current_step", currentStep.toString());
  }, [currentStep]);
  useEffect(() => {
    sessionStorage.setItem("Team_Data", JSON.stringify(formData));
  }, [formData]);

  //functions
  const handleNextStep = () => {
    setCurrentStep((curr) => curr + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep((curr) => curr - 1);
  };

  //return created team info to backend
  const handleCreateTeam = async () => {
    try {

      setIsSubmitting(true);
      setSubmitError("");

      const payload = {
        ...formData,
        userCreated,
      };

      console.log("Payload:", payload);

      const response = await createTeam(payload);

      console.log("Created Team:", response);

      sessionStorage.removeItem("current_step");
      sessionStorage.removeItem("Team_Data");

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
       const backendMessage = error.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setSubmitError("Failed to create team.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    userCreated,
    setUserCreated,
    userOptions,
    hackathonList,
    isSubmitting,
    submitError,
    showSuccess,
    setShowSuccess,
    handleNextStep,
    handlePrevStep,
    handleCreateTeam,
    loading,
  };
}
