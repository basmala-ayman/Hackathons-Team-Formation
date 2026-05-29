import api from "./axiosInstance";
export const getRecommendations = async (tab = "all") => {
  try {
    const response = await api.get(
      `/recommendations?tab=${tab}`
    );
    const data=response.data.data;
      if (tab === "all") {
    return [
      ...(data.myTeams || []),
      ...(data.join || []),
    ];
  }
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch recommendations",
      }
    );
  }
};