import api from "./api";

export const markInterestInHackathon = async (hackathonId) => {
  try {
    const response = await api.post(
      `/interests/hackathons/${hackathonId}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Failed to register interest",
    };
  }
};