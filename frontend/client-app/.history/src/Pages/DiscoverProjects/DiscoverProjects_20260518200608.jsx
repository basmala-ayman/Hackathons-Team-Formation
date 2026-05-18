import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from './DiscoverProjects.module.css'
import { useState } from "react";

function DiscoverProjects() {
  const mockProjects = [
    {
      id: "p1",
      title: "Loremolup illo.",
      description:
        "Buildtium, dchitectdicta Lorem ipsum dolor sit                 <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt repellat quam, accusantium fugiat maiores blanditiis odit impedit ipsum ipsam excepturi dolorem beatae porro, molestiae hic! Sit aliquid reprehenderit et? Officia, consectetur voluptatibus magni debitis doloremque omnis aliquid quisquam culpa, numquam assumenda deleniti atque obcaecati velit, minima sequi nisi incidunt quia adipisci corrupti necessitatibus nam blanditiis quo ipsa pariatur. Veritatis maxime ullam dicta ratione sapiente qui libero nam harum optio. Debitis, earum. Quis officia ducimus alias perspiciatis fugit soluta, nemo aliquid. Nisi sit quos nulla maiores vitae atque nobis magni porro adipisci accusantium cumque sed voluptatibus iure nostrum numquam ad expedita laudantium doloribus repellendus sapiente facilis, a eos repellat totam? A sint doloribus ex eius tempora debitis qui ducimus illum quia inventore enim eveniet provident consequatur quis voluptate, officia deserunt iure dolorum expedita. Sed, maxime ducimus atque eaque dignissimos minus quibusdam blanditiis odit deserunt, repudiandae itaque officiis eius magnam quas, doloremque facere. Reprehenderit qui, doloribus aspernatur explicabo tempora doloremque quam expedita laborum molestiae velit possimus perferendis impedit, a, libero incidunt consectetur exercitationem accusantium itaque iusto? Quos perspiciatis laborum autem sapiente nesciunt adipisci, sequi alias cupiditate sit nemo architecto debitis saepe molestias dolores excepturi quaerat sed iste nulla quidem facere ullam reiciendis?</div>amet consectetur adipisicing elit. Repellendus quo amet, suscipit aspernatur iste quaerat deleniti aliquid? Repellat, tenetur consequatur.</div>  actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
      },
    },
    {
      id: "p2",
      title: "AI-Powered Climate Monitoring System",
      description:
        "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      creator: {
        name: "Hafsa Hikal",
      },
    },
    {
      id: "p3",
      title: "AI-Powered Climate Monitoring System",
      description:
        "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
      },
    },
    {
      id: "p4",
      title: "AI-Powered Climate Monitoring System",
      description:
        "Building an intelligent system that uses machine learning to monitor environmental changes, predict climate patterns, and provide actionable insights for sustainability initiatives.",
      hackathonName: "AI for Climate Action",
      dateRange: "Oct 26-28",
      maxTeamSize: 4,
      interestedCount: 28,
      skills: ["ML/AI", "Frontend", "Backend"],
      roles: ["web developer", "ui/ux designer"],
      creator: {
        name: "Hafsa Hikal",
      },
    },
  ];

  const [projects, setProjects] = useState(mockProjects);
  const handleInterestToggle = (projectId) => {
    
  };
  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
      <div className={`container py-5`}>
        <h3
          className="fw-bolder"
          style={{
            color: "var(--color-very-dark-purple)",
            fontSize: "var(--fs-h3)",
          }}
        >
          Recommended Teams
        </h3>
        <p
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--fs-regular)",
          }}
        >
          Find the perfect team to join and collaborate on exciting hackathon
          projects
        </p>

        {projects.map((project) => (
          <ProjectCard
            title={project.title}
            description={project.description}
            hackathonName={project.hackathonName}
            dateRange={project.dateRange}
            maxTeamSize={project.maxTeamSize}
            interestedCount={project.interestedCount}
            skills={project.skills}
            roles={project.roles}
            creator={project.creator}
            onInterestToggle={() => handleInterestToggle(project.id)}
          ></ProjectCard>
        ))}
      </div>
    </div>
  );
}

export default DiscoverProjects;
