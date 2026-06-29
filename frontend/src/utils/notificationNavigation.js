export const getNotificationNavigation = (notification) => {
  const { type, metadata = {} } = notification;

  switch (type) {
    case "MATCH_FOUND":
      return {
        path: "/recommended-Teams",
        state: {
          initialTab: "invitations",
          teamId: metadata.teamId,
          recommendationId: metadata.recommendationId,
        },
      };

    case "RECOMMENDATION_RECEIVED":
    case "ROUND2_AVAILABLE":
      return {
        path: "/recommended-Teams",
      };

    default:
      return null;
  }
};
