import style from '../RecommendedTeams.module.css'
import TeamCard from './TeamCard/TeamCard'
function RecommendedTeams() {
  return (
    <div>
        <TeamCard id: "t1",
      teamName: "EcoVision Team",
      hackathonName: "Green Tech Hackathon 2026",
      description: "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
      matchLevel: "High",
      maxMembers: 4,
      members: [{ name: "Zeina", avatarUrl: "/path-to-avatar" }, { name: "Aly" }, { name: "Mariam" }, { name: "Omar" }]></TeamCard>
      
    </div>
  )
}

export default RecommendedTeams
