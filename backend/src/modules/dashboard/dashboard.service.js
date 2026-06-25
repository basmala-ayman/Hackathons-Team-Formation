const dashboardRepository = require("./dashboard.repository");
const AppError = require("../../utils/AppError");

const getUserDashboard = async (userId) => {
  const user = await dashboardRepository.getUserDashboardData(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const ownedTeamIds = new Set(
  user.ownedTeams.map(team => team.id)
);

const allTeamsList = [
  ...user.ownedTeams.map((team) => ({
    id: team.id,
    name: team.name,
    status: team.status,
    role: "Owner",
    hackathon: team.hackathon?.title || "General Event"
  })),

  ...user.teamMemberships
    .filter(membership => !ownedTeamIds.has(membership.team.id))
    .map((membership) => ({
      id: membership.team.id,
      name: membership.team.name,
      status: membership.team.status,
      role: "Member",
      hackathon: membership.team.hackathon?.title || "General Event"
    }))
];

  const recommendedTeamsCount = user.matchingRequests.reduce((total, request) => {
    return total + (request.recommendations?.length || 0);
  }, 0);

  return {
    welcomeMessage: `Welcome back, ${user.name}!`,
    metrics: {
      allTeamsCount: allTeamsList.length,
      recommendedTeamsCount: recommendedTeamsCount,
      pendingInvitationsCount: user.receivedInvitations.length
    },
    allTeams: allTeamsList,
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

module.exports = { getUserDashboard, getAdminDashboard };