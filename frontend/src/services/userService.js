import api from "./axiosInstance";

/**
 * getBasicUsers:
 * Fetch lightweight list of users (id, name, email)
 * Used for dropdowns
 */
export const getBasicUsers = async () => {
  try {
    const response = await api.get("/users/list/basic");
    return response.data?.data || []; // return only users array
  } catch (error) {
    throw error.response?.data || "Failed to fetch users list!!";
  }
};
/**
 * getUserProfile: Fetches the profile data of the currently logged-in user.
 * Requires a valid Authorization token (handled automatically by interceptor).
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data?.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user profile!!";
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/users/profile", profileData);
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to update user profile!!";
  }
};

/**
 * getUserBasicInfo:
 * Fetch public basic info of any user by their UUID
 * Returns name, email, LinkedIn, GitHub, skills, tech roles
 */
export const getUserBasicInfo = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/basic-info`);
    return response.data?.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user basic info!!";
  }
};
