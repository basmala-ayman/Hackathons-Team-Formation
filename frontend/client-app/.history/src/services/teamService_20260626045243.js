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

/**
 * getTeamDetails:
 * Fetches full details of a team by its ID
 */
export const getTeamDetails = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch team details!!";
  }
};

export const getMyTeams = async () => {
  try{
    const response = await api.get('/teams/my-teams');
    return response.data.data; 

  }catch(error){
    throw error.response?.data || "Failed to fetch teams!!";

  }
};

export const finalizeTeam = async (teamId) => {
  try{
    const response = await api.patch(`/teams/${teamId}/finalize`);
    return response.data.data;

  }catch(error){
    throw error.response?.data || "Error";

  }
};