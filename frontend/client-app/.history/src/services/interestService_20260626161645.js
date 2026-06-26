import api from "./axiosInstance";

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

export const removeHackathonInterest = async (hackathonId) => {try {
    const response = await api.delete(
      `/interests/hackathons/${hackathonId}`
    );
    
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Failed to remove interest",
    };
  }
};