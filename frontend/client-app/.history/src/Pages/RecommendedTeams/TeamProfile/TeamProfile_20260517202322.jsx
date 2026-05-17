import styles from './TeamProfile.module.css'
import { useParams, Link } from 'react-router-dom';
import CustomButton from '../../../shared/CustomButton/CustomButton';
function TeamProfile() {
    const allTeamsDatabase = [
  {
    id: "t1",
    teamName: "EcoVision Team",
    hackathonName: "Green Tech Hackathon 2026",
    description: "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
    matchLevel: "High",
    maxMembers: 4,
    members: [
      { name: "Sarah Chen", role: "Team Leader",  tags: ["ML/AI", "Python"] },
      { name: "Mike Johnson", role: "Frontend Developer", avatar: "https://via.placeholder.com/150", tags: ["React", "Frontend"] },
      { name: "Lisa Park", role: "Backend Developer", avatar: "https://via.placeholder.com/150", tags: ["Node.js", "Backend"] }
    ]
  }
];
  return (
    <div>
      
    </div>
  )
}

export default TeamProfile
