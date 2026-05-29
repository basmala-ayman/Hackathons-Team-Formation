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