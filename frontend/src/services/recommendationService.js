import api from "./axiosInstance";
export const getRecommendations = async (tab = "all") => {
  try {
    const response = await api.get(`/recommendations?tab=${tab}`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch recommendations",
      }
    );
  }
};

export const acceptRecommendation = async (recId) => {
  return await api.patch(`/recommendations/${recId}/accept`);
};

export const rejectRecommendation = async (teamId) => {
  return await api.patch(`/recommendations/${teamId}/reject`);
};

export const respondToInvitation = async (teamId, action) => {
  return await api.patch(`/recommendations/invitations/${teamId}/respond`, {
    action,
  });
};

export const getRecommendationDetails = async (recommendationId) => {
  const response = await api.get(`/recommendations/${recommendationId}`);

  return response.data.data;
};

export const acceptInvitationFromNotification = async (invitationId) => {
  try {
    const response = await api.patch(
      `/recommendations/invitations/${invitationId}/respond`,
      {
        action: "ACCEPT",
      },
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to accept invitation",
      }
    );
  }
};

export const rejectInvitationFromNotification = async (invitationId) => {
  try {
    const response = await api.patch(
      `/recommendations/invitations/${invitationId}/respond`,
      {
        action: "REJECT",
      },
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to reject invitation",
      }
    );
  }
};
