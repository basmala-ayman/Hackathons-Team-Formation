const prisma = require("../../config/prisma");

const getUserDashboardData = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      // Fetching all owned teams (status: FORMING and COMPLETE)
      ownedTeams: {
        include: { hackathon: true }
      },
      // Fetching all teams user joined as a member
      teamMemberships: {
        include: {
          team: {
            include: { hackathon: true }
          }
        }
      },
      receivedInvitations: {
        where: { status: "PENDING" },
        select: { id: true }
      },
      notifications: {
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          message: true,
          createdAt: true
        }
      },
      matchingRequests: {
        include: {
          recommendations: {
            where: { status: "PENDING" }
          }
        }
      }
    }
  });
};

const getAdminDashboardData = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    totalUsers,
    totalTeams,
    completeTeams,
    autoMatchedTeams,
    manualTeams,
    invitedTeams,
    recentUsers,
    recentTeams,
    weeklyNewUsersCount,
    weeklyNewTeamsCount,
    growthChartRaw
  ] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
    prisma.team.count({ where: { status: "COMPLETE" } }),
    prisma.team.count({ where: { formationMethod: "AUTO_MATCHED" } }),
    prisma.team.count({ where: { formationMethod: "MANUAL" } }),
    prisma.team.count({ where: { formationMethod: "INVITED" } }),
    prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.team.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.team.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" }
    })
  ]);

  const totalFormation = autoMatchedTeams + manualTeams + invitedTeams;
  const growthTimelineMap = {};
  growthChartRaw.forEach((user) => {
    const day = user.createdAt.toISOString().split("T")[0];
    growthTimelineMap[day] = (growthTimelineMap[day] || 0) + 1;
  });

  const participantsGrowth = Object.keys(growthTimelineMap).map((date) => ({
    date,
    count: growthTimelineMap[date]
  }));

  return {
    systemOverview: { totalUsers, totalTeams, completeTeams },
    teamFormationStats: {
      autoMatched: totalFormation ? Math.round((autoMatchedTeams / totalFormation) * 100) : 0,
      manual: totalFormation ? Math.round((manualTeams / totalFormation) * 100) : 0,
      invited: totalFormation ? Math.round((invitedTeams / totalFormation) * 100) : 0
    },
    participantsGrowth,
    weeklyActivity: { newUsers: weeklyNewUsersCount, newTeams: weeklyNewTeamsCount },
    recentActivities: [
      ...recentUsers.map((user) => ({ type: "NEW_USER", message: `${user.name} joined platform`, date: user.createdAt })),
      ...recentTeams.map((team) => ({ type: "NEW_TEAM", message: `${team.name} created`, date: team.createdAt }))
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
  };
};

module.exports = { getUserDashboardData, getAdminDashboardData };