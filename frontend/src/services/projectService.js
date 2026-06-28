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
    const respnose = await api.post(`/interests/projects/${projectId}`);
    return respnose.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to register interest" };
  }
};

export const removeInterestFromProject = async (projectId) => {
  try {
    const response = await api.delete(`/interests/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove interest" };
  }
};