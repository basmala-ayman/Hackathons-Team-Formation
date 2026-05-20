import styles from "./CreateTeam.module.css";
import { useState, useEffect, useMemo } from "react";
import ProTips from "./Components/Sidebar/ProTips";
import QuickStats from "./Components/Sidebar/QuickStats";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from "./Components/TeamSteps/Step2_AddMembers";
import Step3_RequiredSkills from "./Components/TeamSteps/Step3_RequiredSkills";
import Step4_FinalDetails from "./Components/TeamSteps/Step4_FinalDetails";
import SuccessPopUp from "./SuccessPopUp/SuccessPopUp";
import rolesData from "../../Data/roles.json";
import skillsData from "../../Data/skills.json";
import { useAuth } from "../../context/AuthContext/useAuth";
import { getBasicUsers } from "../../services/userService";
import { getHackathonNames } from "../../services/hackathonService";

import {
  TeamMeetIcon,
  AddMemberIcon,
  CheckIcon,
  CodeIcon,
  SparkleIcon,
} from "../../assets/Icons";

function CreateTeam() {
  //get current user
  const { user } = useAuth();

  //get SKills and roles data
  const roleOptions = useMemo(() => {
    return Object.entries(rolesData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  const skillsOptions = useMemo(() => {
    return Object.entries(skillsData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);
  //to display the key not the value of roles and skills data when needed
  const reverseRolesMap = useMemo(() => {
    const map = {};
    Object.entries(rolesData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);
  const reverseSkillsMap = useMemo(() => {
    const map = {};
    Object.entries(skillsData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);

  //Steps Data
  const createSteps = [
    { id: 1, title: "Team Basics", icon: <TeamMeetIcon /> },
    { id: 2, title: "Build Your Team", icon: <AddMemberIcon /> },
    {
      id: 3,
      title: "Required Skills",
      icon: <CodeIcon color="var(--color-primary-dark)" />,
    },
    {
      id: 4,
      title: "Final Details",
      icon: <CheckIcon color="var(--color-primary-dark)" />,
    },
  ];

  //function to get saved user's data
  const getSavedData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };
  //states
  const [users, setUsers] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingHackathons, setLoadingHackathons] = useState(false);

  const [currentStep, setCurrentStep] = useState(() =>
    Number(getSavedData("Current_step", 1)),
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  //Team Created Data
  const [formData, setFormData] = useState(() =>
    getSavedData("Team_Data", {
      //if Team_Data not found , default values:
      teamName: "",
      hackathonName: "",
      description: "",
      teamSize: 4,
      members: [],
      skills: [],
      roles: [],
      hasIdea: false,
    }),
  );

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUsers(true);
        setLoadingHackathons(true);

        const [usersRes, hackathonsRes] = await Promise.all([
          getBasicUsers(),
          getHackathonNames(),
        ]);

        setUsers(usersRes);
        setHackathons(hackathonsRes);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoadingUsers(false);
        setLoadingHackathons(false);
      }
    };

    fetchData();
  }, []);

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

  //save data inside local storage
  useEffect(() => {
    localStorage.setItem("current_step", currentStep.toString());
  }, [currentStep]);
  useEffect(() => {
    localStorage.setItem("Team_Data", JSON.stringify(formData));
  }, [formData]);

  //functions
  const handleNextStep = () => {
    setCurrentStep((curr) => curr + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep((curr) => curr - 1);
  };
  const handleCreateTeam = async () => {
    // API Call will be here !!!
    console.log("Final Submission to API:", formData);

    localStorage.removeItem("current_step");
    localStorage.removeItem("Team_Data");

    setShowSuccess(true);
  };

  //rendering components
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_TeamBasics
            formData={formData}
            setFormData={setFormData}
            hackathonList={hackathonList}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <Step2_AddMembers
            formData={formData}
            setFormData={setFormData}
            currentUser={user}
            userOptions={userOptions}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        );
      case 3:
        return (
          <Step3_RequiredSkills
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            roleOptions={roleOptions}
            skillsOptions={skillsOptions}
            reverseRolesMap={reverseRolesMap} // Pass the map
            reverseSkillsMap={reverseSkillsMap}
          />
        );
      case 4:
        return (
          <Step4_FinalDetails
            formData={formData}
            onPrev={handlePrevStep}
            onSubmit={handleCreateTeam}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
      {showSuccess && (
        <SuccessPopUp
          teamName={formData.teamName}
          onClose={() => setShowSuccess(false)}
        />
      )}
      <div className="container py-5">
        <header className="d-flex align-items-center mb-5">
          <div className={styles.headerIconBox}>
            <SparkleIcon color="#fff" size={24} />
          </div>
          <div className="ms-4">
            <h1 className={styles.mainTitle}>Create Your Dream Team</h1>
            <p className={`mb-0 ${styles.subTitle}`}>
              Build an amazing team for your next hackathon adventure
            </p>
          </div>
        </header>

        {/* ---  Stepper Row --- */}
        <div className="row mb-5">
          <div className="col-12">
            <Stepper currentStep={currentStep} steps={createSteps} />
          </div>
        </div>

        {/* --- Main Content Row (Grid) --- */}
        <div className="row g-4">
          {/* Left Column*/}
          <div className="col-lg-8">
            <div className={`card border-0 ${styles.formCard}`}>
              <div className={styles.cardHeader}>
                <span className="me-2">
                  {createSteps[currentStep - 1].icon}
                </span>
                {createSteps[currentStep - 1].title}
              </div>
              <div className="card-body p-0">{renderStep()}</div>
            </div>
          </div>

          {/* Right Column*/}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <QuickStats formData={formData} currentStep={currentStep} />
            <ProTips currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
