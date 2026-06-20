import api from "./axiosInstance";
export const getExploreProjects = async () => {
  try {
    const res = await api.get("/project/explore");
    return res.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch projects" };
  }
};

export const markInterest = async (projectId) => {
  try {
    const res = await api.post(`/project/interest/${projectId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to toggle interest" };
  }
};