import api from "./axiosInstance";
export const getRecommendations = async (tab = "all") => {
  try {
    const response = await api.get(
      `/recommendations?tab=${tab}`
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch recommendations",
      }
    );
  }
};


export const acceptRecommendation = async (teamId) => {
  return await api.patch(
    `/recommendations/${teamId}/accept`
  );
};

export const rejectRecommendation = async (teamId) => {
  return await api.patch(
    `/recommendations/${teamId}/reject`
  );
};

export const respondToInvitation = async (
  teamId,
  action
) => {
  return await api.patch(
    `/recommendations/invitations/${teamId}/respond`,
    {
      action,
    }
  );
};