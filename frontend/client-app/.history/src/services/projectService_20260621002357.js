import api from "./axiosInstance";
export const getExploreProjects = async () => {
  try {
    const respnose = await api.get("/project/explore");
    return respnose.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch projects" };
  }
};

export const markInterestInProject = async (projectId) => {
  try {
    const respnose = await api.post(`/project/interest/${projectId}`);
    return respnose.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to register interest" };
  }
};