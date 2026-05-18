import React from 'react'
import ProjectCard from './ProjectCard/ProjectCard'
import { useState } from 'react';

function DiscoverProjects() {
    const mockProjects = [
    {
      id: "p1",
      title: "AI-Powered Climate Monitoring System",
      description: "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      creator: {
        name: "Hafsa Hikal",
        avatarUrl: "https://via.placeholder.com/150"
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
        avatarUrl: "https://via.placeholder.com/150"
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
      creator: {
        name: "Hafsa Hikal",
        avatarUrl: "https://via.placeholder.com/150"
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
      creator: {
        name: "Hafsa Hikal",
        avatarUrl: "https://via.placeholder.com/150"
      }
    }
  ];

  const [projects, setProjects] = useState(mockProjects);
  return (
    <div>
        {projects.map((project) => (
        <ProjectCard title={project.title}
                description={project.description}
                hackathonName={project.hackathonName}
                dateRange={project.dateRange}
                maxTeamSize={project.maxTeamSize}
                interestedCount={project.interestedCount}
                skills={project.skills}
                creator={project.creator}
                onInterestToggle={() => handleInterestToggle(project.id)}></ProjectCard>
      
        ))</div>
  )
}

export default DiscoverProjects
