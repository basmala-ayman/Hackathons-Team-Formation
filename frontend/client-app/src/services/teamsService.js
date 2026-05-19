import api from "./axiosInstance";

/**
 * createTeam:
 * Creates a new hackathon team with members, skills, and roles
 */
export const createTeam = async (teamData) => {
  try {
    const response = await api.post("/teams", teamData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || "Failed to create team!!";
  }
};

//or
// export const createTeam = async (teamData) => {
//   try {
//     const response = await api.post("/teams", teamData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || "Failed to create team!!";
//   }
// };