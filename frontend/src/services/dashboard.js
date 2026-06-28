import api from "./axiosInstance";

/**
 * * @returns {Promise<{
 * success: boolean,
 * message: string,
 * data: {
 * welcomeMessage: string,
 * metrics: {
 * activeTeamsCount: number,
 * recommendedTeamsCount: number,
 * pendingInvitationsCount: number
 * },
 * activeTeams: Array<{ id: string, name: string, role: string, hackathon: string }>,
 * recentActivities: Array<{ id: string, type: string, message: string, date: string }>
 * }
 * }>}
 */
export const getUserDashboard = async () => {
  try {
    const response = await api.get("/dashboard/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(" Error in getUserDashboard service wrapper:", error);
    throw error;
  }
};

export const getAdminDashboard = async () => {
  try {
    const response = await api.get("/dashboard/admin");
    return response.data;
  } catch (error) {
    console.error("Error in getAdminDashboard:", error);
    throw error;
  }
};
