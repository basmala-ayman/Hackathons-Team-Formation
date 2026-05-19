import api from "./axiosInstance";

export const getAllHackathons = async () => {
  try {
    const response = await api.get("/hackathons");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch hackathons!!";
  }
};

/**
 * getHackathonById: Fetches details for a specific hackathon.
 * @param {string} id - The unique ID of the hackathon.
 */

export const getHackathonById = async (id) => {
  try {
    const response = await api.get(`/hackathons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || `Failed to fetch hackathon with ID: ${id}!!`;
  }
};

/**
 * getHackathonNames: Fetches only hackathon names for dropdowns / search suggestions.
 * Returns: ["Hackathon A", "Hackathon B", ...]
 */
export const getHackathonNames = async () => {
  try {
    const response = await api.get("/hackathons/names/list");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch hackathon names!!";
  }
};