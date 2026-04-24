import api from "./axiosInstance";

/**
 * register: sends a POST request to the backend to create a new user.
 * @param {Object} userData - The object containing { name, email, password }
 */

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      "An unexpected error occurred during registration!!"
    );
  }
};

/**
 * login: sends a POST request to authenticate a user.
 * @param {Object} credentials - The object containing { email, password }
 */

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An unexpected error occurred during login!!";
  }
};

/**
 * verifyEmail: sends a GET request with a token to verify the account.
 * @param {string} token - The verification token from the email URL.
 */
export const verifyEmail = async (token) => {
  try {
    const response = await api.get("/auth/verify-email", {
      params: { token },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Verification failed!!";
  }
};

/**
 * resendVerification: sends a POST request to trigger a new email.
 * @param {string} email - The user's email address.
 */
export const resendVerification = async (email) => {
  try {
    const response = await api.post("/auth/resend-verification", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Could not resend verification email!!";
  }
};

/**
 * googleOAuth: sends a Google OAuth token to the backend for verification.
 * @param {string} token - The token received from the Google Login provider on the frontend.
 */
export const googleOAuth = async (token) => {
  try {
    const response = await api.post("/auth/google", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Google Auth failed!!";
  }
};

/**
 * forgotPassword: sends a request to the backend to trigger a password reset email.
 * @param {string} email - The user's registered email address.
 */

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Could not process forgot password request!!";
  }
};

/**
 * resetPassword: sends the new password and the token received via email to the backend.
 * @param {Object} resetData - { token, newPassword }
 */

export const resetPassword = async (resetData) => {
  try {
    const response = await api.post("/auth/reset-password", resetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Password reset failed!!";
  }
};
