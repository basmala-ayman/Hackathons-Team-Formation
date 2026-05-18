import styles from './ProjectCard.module.css'
import { useState } from 'react';
function ProjectCard({ 
  creator, 
  title, 
  description, 
  hackathonName, 
  dateRange, 
  skills = [], 
  roles=[],
  maxTeamSize = 4, 
  interestedCount = 0,
  onInterestToggle 
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleSkills = isExpanded ? skills : skills.slice(0, 3);
  const hasHiddenSkills = skills.length > 3;
  const visibleRoles = isExpanded ? roles : roles.slice(0, 3);
  const hasHiddenSkills = skills.length > 3;
  return (
    <div>
      
    </div>
  )
}

export default ProjectCard;
