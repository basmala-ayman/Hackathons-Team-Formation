import api from "./axiosInstance";

export const markInterestInHackathon = async (hackathonId) => {
  try {
    const res = await api.post(
      `/interests/hackathons/${hackathonId}`
    );

    return res.data;
  } catch (error) {
    throw error.res?.data || {
      message: "Failed to register interest",
    };
  }
};
