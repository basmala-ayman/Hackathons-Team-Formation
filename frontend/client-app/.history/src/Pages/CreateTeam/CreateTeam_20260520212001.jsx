import styles from "./CreateTeam.module.css";
import ProTips from "./Components/Sidebar/ProTips";
import QuickStats from "./Components/Sidebar/QuickStats";
import Stepper from "./Components/Stepper/Stepper";
import Step1_TeamBasics from "./Components/TeamSteps/Step1_TeamBasics";
import Step2_AddMembers from "./Components/TeamSteps/Step2_AddMembers";
import Step3_RequiredSkills from "./Components/TeamSteps/Step3_RequiredSkills";
import Step4_FinalDetails from "./Components/TeamSteps/Step4_FinalDetails";
import SuccessPopUp from "./SuccessPopUp/SuccessPopUp";


import { useAuth } from "../../context/AuthContext/useAuth";
import { useStaticData } from "../../hooks/useStaticData";

import { useCreateTeamForm } from "./hooks/useCreateTeamForm";
import { CREATE_STEPS } from "./CreateTeam.constants";

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
  const {
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

  //get static data 
  const { roleOptions, skillsOptions, reverseRolesMap, reverseSkillsMap } = useStaticData();

  
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

 
  //states
  const [users, setUsers] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingHackathons, setLoadingHackathons] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [currentStep, setCurrentStep] = useState(() =>
    Number(getSavedData("Current_step", 1)),
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [userCreated, setUserCreated] = useState(false); //state for adding new hackthon not in the list

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
            userCreated={userCreated}
            setUserCreated={setUserCreated}
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
            isSubmitting={isSubmitting}
            submitError={submitError}
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
