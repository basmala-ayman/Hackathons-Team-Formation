export const getNotificationNavigation = (notification) => {
  const { type, metadata = {} } = notification;

  switch (type) {
    case "TEAM_INVITE":
      return {
        path: "/recommended-Teams",
        state: {
          initialTab: "invitations",
          teamId: metadata.teamId,
          recommendationId: metadata.recommendationId,
        },
      };

    case "INVITE_ACCEPTED":
      return {
        path: "/recommended-Teams",
        state: {
          initialTab: "myTeams",
          teamId: metadata.teamId,
        },
      };

    case "RECOMMENDATION_RECEIVED":
      return {
        path: "/recommended-Teams",
      };

    default:
      return null;
  }
};
