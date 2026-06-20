import api from "./axiosInstance";
export const getExploreProjects = async () => {
  try {
    const respnose = await api.get("/project/explore");
    return res.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch projects" };
  }
};

export const markInterestInProject = async (projectId) => {
  try {
    const res = await api.post(`/project/interest/${projectId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to register interest" };
  }
};