import { color } from 'chart.js/helpers';
import styles from './RecommendedTeams.module.css'
import TeamCard from './TeamCard/TeamCard'
import SearchBar from '../../shared/SearchBar/SearchBar';
function RecommendedTeams() {

    const recommendedTeams = [
    {
      id: "t1",
      teamName: "EcoVision Team",
      hackathonName: "Green Tech Hackathon 2026",
      description: "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
      matchLevel: "High",
      maxMembers: 6,
      members: [{ name: "Zeina"}, { name: "Aly" }, { name: "Mariam" }, { name: "Omar" }]
    },
    
  ];
  function handleSearch(){

  }
  function handleAcceptTeam(){

  }

  function handleViewTeam(){

  }

  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
    <div className={`container py-5`} >
        <h3 className='fw-bolder' style={{color:'var(--color-very-dark-purple)' , fontSize:'var(--fs-h3)'}}>Recommended Teams</h3>
      <p style={{color:'var(--color-dark-gray)' , fontSize:'var(--fs-regular)'}}>Find the perfect team to join and collaborate on exciting hackathon projects</p>

        <SearchBar onSearch={handleSearch} placeholderText={"Search by team title or keyword"} className='py-2'></SearchBar>
     
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
    </div>
  )
}

export default RecommendedTeams
