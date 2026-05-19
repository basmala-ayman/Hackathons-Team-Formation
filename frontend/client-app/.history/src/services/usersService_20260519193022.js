import api from "./axiosInstance";
/**
 * getBasicUsers:
 * Fetch lightweight list of users (id, name, email)
 * Used for dropdowns
 */
export const getBasicUsers = async () => {
  try {
    const response = await api.get("/user/list/basic");
    return response.data?.data || []; // return only users array
  } catch (error) {
    throw error.response?.data || "Failed to fetch users list!!";
  }
};