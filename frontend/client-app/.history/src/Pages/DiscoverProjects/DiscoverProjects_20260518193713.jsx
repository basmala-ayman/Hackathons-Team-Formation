import React from 'react'
import ProjectCard from './ProjectCard/ProjectCard'
import { useState } from 'react';

function DiscoverProjects() {
    const mockProjects = [
    {
      id: "p1",
      title: "Loremolup illo.",
      description: "Buildtium, dchitectdicta  actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
        
      }
    },
    {
      id: "p2",
      title: "AI-Powered Climate Monitoring System",
      description: "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      creator: {
        name: "Hafsa Hikal",
      }
    },
    {
      id: "p3",
      title: "AI-Powered Climate Monitoring System",
      description: "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
      }
    },
    {
      id: "p4",
      title: "AI-Powered Climate Monitoring System",
      description: "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
      }
    }
  ];

  const [projects, setProjects] = useState(mockProjects);
  const handleInterestToggle = (projectId) => {
    alert(`Fired interest registration workflow for project key: ${projectId}`);
  };
  return (
    <div className='container py-5 '>
        {projects.map((project) => (
        <ProjectCard title={project.title}
                description={project.description}
                hackathonName={project.hackathonName}
                dateRange={project.dateRange}
                maxTeamSize={project.maxTeamSize}
                interestedCount={project.interestedCount}
                skills={project.skills}
                roles={project.roles}
                creator={project.creator}
                onInterestToggle={() => handleInterestToggle(project.id)}></ProjectCard>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quo amet, suscipit aspernatur iste quaerat deleniti aliquid? Repellat, tenetur consequatur.</div>
      
        ))}</div>
        
  )
}

export default DiscoverProjects
