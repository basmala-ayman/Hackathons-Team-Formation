import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./DiscoverProjects.module.css";
import { useExploreProjects } from "./hooks/useExploreProjects";
import { useProjectInterest } from "./hooks/useProjectInterest";
import { LoadingState, EmptyState } from "../../shared/States";
import { formatDate } from "../../utils/formateDate";
import toast from "react-hot-toast";

function DiscoverProjects() {
  const { projects, loading, error, setProjects } = useExploreProjects();
  console.log('projects', projects);
  const { registerInterest,removeInterest, loadingId } = useProjectInterest();

  const handleInterestToggle = async (projectId) => {
    const targetProject = projects.find((p) => p.id === projectId);
    const isCurrentlyInterested = targetProject?.isInterested;

    try {
      if (isCurrentlyInterested) {
        // --- 1. REMOVE INTEREST ---
        await removeInterest(projectId);
        
        setProjects((prev) =>
          prev.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  isInterested: false,
                  // Decrement locally so it updates immediately on the UI
                  totalInterestsCount: Math.max(0, project.totalInterestsCount - 1),
                }
              : project
          )
        );
        toast.success("Interest removed");

      } else {
        // --- 2. ADD INTEREST ---
        const response = await registerInterest(projectId);
        
        setProjects((prev) =>
          prev.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  isInterested: true,
                  // Use backend size if returned, otherwise increment locally
                  totalInterestsCount: response.data?.currentPoolSize || project.totalInterestsCount + 1,
                }
              : project
          )
        );
        toast.success("Interest submitted");
      }
    } catch (error) {
      const backendMessage = error.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
    }
  };
  if (loading) {
    return <LoadingState message="Loading Projects" />;
  }
  if (error || projects.length === 0) {
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
              key={project.id}
              title={project.title}
              description={project.description}
              hackathonName={project.hackathonTitle}
              createdAt={formatDate(project.createdAt)}
              maxTeamSize={project.totalTeamSize}
              currentTeamSize={project.totalTeamMembersCount}
              interestedCount={project.totalInterestsCount}
              skills={project.requiredSkills}
              roles={project.requiredRoles}
              creator={{
                name: project.creatorName,
                avatarUrl: project.creatorPicture,
                role: project.creatorRole,
              }}
              onInterestToggle={() => handleInterestToggle(project.id)}
              isInterested={project.isInterested}
              isLoading={loadingId === project.id}
            ></ProjectCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscoverProjects;
