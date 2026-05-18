import React from 'react'
import ProjectCard from './ProjectCard/ProjectCard'
import { useState } from 'react';

function DiscoverProjects() {
    const mockProjects = [
    {
      id: "p1",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita fugit enim voluptatum voluptates in tempora, maxime doloremque nihil blanditiis illo.",
      description: "Building Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, quia fuga? Adipisci quos ipsum temporibus illo numquam nostrum accusantium, deserunt ipsa vel alias quasi tempora? Veniam quam architecto perferendis. Odio quibusdam, officiis beatae dicta debitis deserunt omnis veritatis corporis quae quis adipisci. Omnis ea autem dignissimos adipisci quo harum mollitia, minus non placeat dolore quam perspiciatis, reiciendis veniam a vitae quae officiis quasi veritatis eius id iste cupiditate. Soluta repudiandae, labore adipisci ab consectetur sapiente molestiae libero ullam veritatis esse voluptate ducimus vero fugiat blanditiis explicabo mollitia vel praesentium voluptates! Impedit blanditiis placeat a? Totam nemo quos repudiandae rerum iste. ipsum dolor sit amet consectetur adipisicing elit. Expedita fugit enim voluptatum voluptates in tempora, maxime doloremque nihil blanditiis illo. an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
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
    <div className='container py-5 gap'>
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
      
        ))}</div>
        
  )
}

export default DiscoverProjects
