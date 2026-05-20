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
    // 🔑 FIX 3: Hit the plural /users/profile endpoint with plain JSON data
    const response = await api.put("/users/profile", profileData);
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to update user profile!!";
  }
};

// /**
//  * updateUserProfile: Sends a PUT request to update the current user's profile details.
//  * @param {FormData} formData - The payload box carrying text fields and files
//  */
// export const updateUserProfile = async (formData) => {
//   try {
//     const response = await api.put("/users/profile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response;
//   } catch (error) {
//     throw error.response?.data || "Failed to update user profile!!";
//   }
// };
