import api from "./axiosInstance";
<<<<<<< HEAD
=======

>>>>>>> 03c8ef8294183c378e0276a5974eb3b03735ed42
/**
 * getBasicUsers:
 * Fetch lightweight list of users (id, name, email)
 * Used for dropdowns
 */
export const getBasicUsers = async () => {
  try {
<<<<<<< HEAD
    const response = await api.get("/users/list/basic");
    return response.data?.data || []; // return only users array
  } catch (error) {
    throw error.response?.data || "Failed to fetch users list!!";
  }
=======
    const response = await api.get("/user/list/basic");
    return response.data.data; // return only users array
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
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user profile!!";
  }
};

/**
 * updateUserProfile: Sends a PUT request to update the current user's profile details.
 * @param {Object} updatedData - Object containing { name, bio, profilePicture, resumeUrl, githubUrl, linkedinUrl }
 */
export const updateUserProfile = async (updatedData) => {
  try {
    const response = await api.put("/user/profile", updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update user profile!!";
  }
>>>>>>> 03c8ef8294183c378e0276a5974eb3b03735ed42
};