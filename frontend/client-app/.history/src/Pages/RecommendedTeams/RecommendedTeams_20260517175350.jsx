import styles from './RecommendedTeams.module.css'
import TeamCard from './TeamCard/TeamCard'
import SearchBar from '../../shared/SearchBar/SearchBar';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
function RecommendedTeams() {

    const navigate = useNavigate();
    const currentUserId = "user-123"; //WILL BE REPLACED WITH ID FROM AUTH LATER


    //duumy data
    const recommendedTeams = [
   {
      id: "t1",
      teamName: "EcoVision Team",
      hackathonName: "Green Tech Hackathon 2026",
      description: "Building sustainable solutions for environmental monitoring using AI and IoT sensors.",
      matchLevel: "High",
      maxMembers: 6,
      ownerId: "user-999", 
      members: [{ name: "Aly" }, { name: "Mariam" }, { name: "Omar" }]
    },
    {
      id: "t2",
      teamName: "Neural Green Team",
      hackathonName: "AI for Climate Action",
      description: "Developing neural networks to predict and optimize renewable energy production.",
      matchLevel: "Medium",
      maxMembers: 4,
      ownerId: "user-123", 
      members: [{ name: "Zeina" }]
    }    
  ];

  //states
  const [teams] = useState(recommendedTeams);
  const [searchQuery, setSearchQuery] = useState("");

 const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };
  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchQuery) || 
    team.hackathonName.toLowerCase().includes(searchQuery)
  );

  const handleAcceptTeam=(isOwner)=>{
    //will be implemented later
  };

  const handleViewTeam = (teamId) => {
    navigate(`/teams/${teamId}`); 
  };

  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
    <div className={`container py-5`} >
        <h3 className='fw-bolder' style={{color:'var(--color-very-dark-purple)' , fontSize:'var(--fs-h3)'}}>Recommended Teams</h3>
      <p style={{color:'var(--color-dark-gray)' , fontSize:'var(--fs-regular)'}}>Find the perfect team to join and collaborate on exciting hackathon projects</p>

        <div className='my-5'>
        <SearchBar onSearch={handleSearch} placeholderText={"Search by team title or hackathon"} ></SearchBar>

        </div>
     
      {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => {
            const isOwner = team.ownerId === currentUserId;
            
            // Set dynamic button label text
            const buttonLabel = isOwner ? "Accept Recommended Members" : "Accept to Join Team";

            return (
              <TeamCard 
                key={team.id}
                teamName={team.teamName}
                hackathonName={team.hackathonName}
                description={team.description}
                matchLevel={team.matchLevel}
                members={team.members}
                maxMembers={team.maxMembers}
                acceptLabel={buttonLabel} // Pass down label variable
                onAccept={() => handleAcceptTeam(team.id, isOwner)}
                onView={() => handleViewTeam(team.id)}
              />
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-5">
            No recommended teams match your search criteria.
          </div>
        )}
      
    </div>
    </div>
  )
}

export default RecommendedTeams
