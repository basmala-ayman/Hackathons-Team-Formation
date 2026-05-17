import styles from './RecommendedTeams.module.css'
import TeamCard from './TeamCard/TeamCard'
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
      members: [{ name: "Aly" }, { name: "Mariam" }, { name: "Omar" } , { name: "kenzy" } , { name: "Mohamed" }]
    },
    {
      id: "t2",
      teamName: "Neural Green Team",
      hackathonName: "AI for Climate Action",
      description: "Developing neural networks to predict and optimize renewable energy production.",
      matchLevel: "Medium",
      maxMembers: 4,
      ownerId: "user-123", 
      members: [{ name: "Zeina" } , { name: "Aly" }]
    }  ,
    {
      id: "t3",
      teamName: "CodeCrafters",
      hackathonName: "EdTech Innovation Challenge",
      description: "Creating an innovative platform for collaborative coding education.",
      matchLevel: "Low",
      maxMembers: 4,
      ownerId: "user-456", // Someone else owns this
      members: [{ name: "Hassan" }, { name: "Sara" }]
    }  
  ];

  //states
  //'all' | 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState('all');
  const [teams] = useState(recommendedTeams);

  //filter based on chosen tab
  const filteredTeams = teams.filter(team => {
    if (activeTab === 'owned') {
      return team.ownerId === currentUserId;
    }
    if (activeTab === 'suggested') {
      return team.ownerId !== currentUserId;
    }
    return true; //return all teams
  });

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

       <div className="d-flex gap-2 my-4 flex-wrap">
          <button
            type="button"
            className={`px-4 py-2 fw-medium fs- ${activeTab === 'all' ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab('all')}
          >
            All Recommendations
          </button>
          
          <button
            type="button"
            className={`px-4 py-2 fw-medium ${activeTab === 'owned' ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab('owned')}
          >
            My Created Teams
          </button>
          
          <button
            type="button"
            className={`px-4 py-2 fw-medium ${activeTab === 'suggested' ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => setActiveTab('suggested')}
          >
            Suggested to Join
          </button>
        </div>
        
      {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => {
            const isOwner = team.ownerId === currentUserId;
            const buttonLabel = isOwner ? "Accept Recommended Members" : "Accept to Join Team";

            return (
              <TeamCard 
                key={team.id}
                teamName={team.teamName}
                hackathonName={team.hackathonName}
                description={team.description}
                members={team.members}
                maxMembers={team.maxMembers}
                acceptLabel={buttonLabel} 
                onAccept={() => handleAcceptTeam(isOwner)}
                onView={() => handleViewTeam(team.id)}
              />
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-4">
            No recommended teams match your search criteria.
          </div>
        )}
      
    </div>
    </div>
  )
}

export default RecommendedTeams
