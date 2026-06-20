import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./DiscoverProjects.module.css";
import { useExploreProjects } from "./hooks/useExploreProjects";
import { LoadingState, EmptyState } from "../../shared/States";

function DiscoverProjects() {
  const { projects, loading, error, setProjects } = useExploreProjects();

  const handleInterestToggle = (projectId) => {
    //Add to interests logic
  };
  if (loading) {
    return <LoadingState message="Loading Projects..." />;
  }
  if (error) {
    return <EmptyState message="No Projects found" />;
  }

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
          Discover Project Ideas
        </h3>
        <p
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--fs-regular)",
          }}
        >
          Browse exciting projects and join teams that match your skills
        </p>

        <div className="d-flex flex-column mt-4 gap-5">
          {projects.map((project) => (
            <ProjectCard
              title={project.title}
              description={project.description}
              hackathonName={project.hackathonName}
              // dateRange={project.dateRange}
              maxTeamSize={project.totalTeamMembersCount}
              interestedCount={project.v}
              skills={project.skills}
              roles={project.roles}
              creator={project.creator}
              onInterestToggle={() => handleInterestToggle(project.id)}
            ></ProjectCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverProjects;
