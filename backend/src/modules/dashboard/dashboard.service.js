const dashboardRepository = require("./dashboard.repository");
const AppError = require("../../utils/AppError");

const getUserDashboard = async (userId) => {
  const user = await dashboardRepository.getUserDashboardData(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 1. Gather info about active teams (status === "COMPLETE")
  const activeTeamsList = [
    ...user.ownedTeams.map((team) => ({
      id: team.id,
      name: team.name,
      role: "Leader/Owner",
      hackathon: team.hackathon?.title || "General Event"
    })),
    ...user.teamMemberships.map((membership) => ({
      id: membership.team.id,
      name: membership.team.name,
      role: "Member",
      hackathon: membership.team.hackathon?.title || "General Event"
    }))
  ];

  // 2. Extract and count pending recommended teams across all matching requests
  const recommendedTeamsCount = user.matchingRequests.reduce((total, request) => {
    return total + (request.recommendations?.length || 0);
  }, 0);

  return {
    welcomeMessage: `Welcome back, ${user.name}!`,
    metrics: {
      activeTeamsCount: activeTeamsList.length,
      recommendedTeamsCount: recommendedTeamsCount,
      pendingInvitationsCount: user.receivedInvitations.length
    },
    activeTeams: activeTeamsList,
    recentActivities: user.notifications.map((notification) => ({
      id: notification.id,
      type: notification.type,
      message: notification.message,
      date: notification.createdAt
    }))
  };
};

const getAdminDashboard = async () => {
  return dashboardRepository.getAdminDashboardData();
};

module.exports = {
  getUserDashboard,
  getAdminDashboard
};