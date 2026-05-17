import style from '../RecommendedTeams.module.css'
import TeamCard from './TeamCard/TeamCard'
function RecommendedTeams() {

    const recommendedTeams = [
    {
      id: "t1",
      teamName: "EcoVision Team",
      hackathonName: "Green Tech Hackathon 2026",
      description: "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
      matchLevel: "High",
      maxMembers: 4,
      members: [{ name: "Zeina", avatarUrl: "/path-to-avatar" }, { name: "Aly" }, { name: "Mariam" }, { name: "Omar" }]
    },
    // ... more items
  ];
  return (
    <div>
        <TeamCard  ></TeamCard>
      
    </div>
  )
}

export default RecommendedTeams
