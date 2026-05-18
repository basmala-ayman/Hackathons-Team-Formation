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
  function handleAcceptTeam(){
    
  }
  return (
    <div>
       {recommendedTeams.map((team) => (
          <TeamCard 
            key={team.id}
            teamName={team.teamName}
            hackathonName={team.hackathonName}
            description={team.description}
            matchLevel={team.matchLevel}
            members={team.members}
            maxMembers={team.maxMembers}
            onAccept={() => handleAcceptTeam(team.id)}
            onView={() => handleViewTeam(team.id)}
          />
        ))}
      
    </div>
  )
}

export default RecommendedTeams
