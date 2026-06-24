import { useState, useEffect } from "react";
import {
  login as loginService,
  registerService,
  resendVerification as resendVerificationService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
} from "../../services/authService";
import {
  storeTokens,
  clearTokens,
  getAccessToken,
} from "../../utils/tokenStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { AuthContext } from "./AuthContext.jsx";
import { getUserProfile } from "../../services/userService.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // load user on refresh
  useEffect(() => {
    const loadUserProfile = async () => {
      const token = getAccessToken();

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const profileData = await getUserProfile();
        setUser(prev => ({
          ...prev,
          profilePicture: profileData.profile?.profilePicture,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUserProfile();
  }, []);

  const login = async (credentials) => {
    setIsSubmitting(true);

    try {
      const response = await loginService(credentials);
      const actualData = response.data;
      storeTokens(
        actualData.accessToken,
        actualData.refreshToken
      );
      const profileData = await getUserProfile();
      setUser({
        ...actualData.user,
        profilePicture: profileData.profile?.profilePicture,
      });
      return actualData;
    } catch (err) {
      const errorData = {
        // Look for the message from the backend, otherwise use a default message something went wrong
        message: err.response?.data?.message || "Something went wrong",
        // Look for the REAL status (401), otherwise fallback to 500
        status: err.response?.status || 500,
      };
      throw errorData;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsSubmitting(true);
    try {
      const data = await forgotPasswordService(email);
      return data;
    } catch (err) {
      throw {
        message:
          err.response?.data?.message ||
          "Something went wrong, please try again later",
        status: err.response?.status || 500,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("current_step");
    sessionStorage.removeItem("Team_Data");
    clearTokens();
  };

  const isAuthenticated = !!user;

  const registerUser = async (userData) => {
    setIsSubmitting(true);
    try {
      const data = await registerService(userData);
      return data;
    } catch (err) {
      const errorData = {
        message:
          err.response?.data?.message || err.message || "Registration failed",
        status: err.response?.status || 500,
      };
      throw errorData;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendEmail = async (email) => {
    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim().replace(/\.+$/, "");
      const data = await resendVerificationService(cleanEmail);
      return data;
    } catch (err) {
      throw {
        message:
          err.response?.data?.message || "Could not resend verification email",
        status: err.response?.status || 500,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async ({ token, newPassword }) => {
    setIsSubmitting(true);
    try {
      const data = await resetPasswordService({
        token,
        newPassword,
      });
      return data;
    } catch (err) {
      throw {
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update your password.",
        status: err.response?.status || 500,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        loading,
        isSubmitting,
        register: registerUser,
        resendVerification: resendEmail,
        forgotPassword: handleForgotPassword,
        resetPassword: handleResetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
