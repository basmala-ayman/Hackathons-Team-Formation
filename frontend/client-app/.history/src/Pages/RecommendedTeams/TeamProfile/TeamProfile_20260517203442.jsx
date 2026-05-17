import styles from "./TeamProfile.module.css";
import { useParams, Link } from "react-router-dom";
import CustomButton from "../../../shared/CustomButton/CustomButton";
const allTeamsDatabase = [
  {
    id: "t1",
    teamName: "EcoVision Team",
    hackathonName: "Green Tech Hackathon 2026",
    description:
      "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
    matchLevel: "High",
    maxMembers: 4,
    members: [
      { name: "Sarah Chen", role: "Team Leader", tags: ["ML/AI", "Python"] },
      {
        name: "Mike Johnson",
        role: "Frontend Developer",
        tags: ["React", "Frontend"],
      },
      {
        name: "Lisa Park",
        role: "Backend Developer",
        tags: ["Node.js", "Backend"],
      },
    ],
  },
];
function TeamProfile()

const { id } = useParams();

  const teamId = allTeamsDatabase.find(team => team.id === id);

  // Defensive Check: If someone types a fake ID in the URL bar
  if (!teamData) {
    return <div className="container py-5 text-center"><h4>Team not found!</h4></div>;
  }

{
  return <div></div>;
}

export default TeamProfile;
