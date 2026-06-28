import toast from "react-hot-toast";
import { getCSSVariable } from "./getColors"; // Adjust path to your utility

export const popUp = {
  // Use this for "Not Registered" or "Unauthorized"
  warn: (message) => {
    const primaryDark = getCSSVariable("--color-primary-dark") || "#6366f1";

    toast(message, {
      icon: "✨", // A "designer" touch
      duration: 5000,
      style: {
        border: `1px solid ${primaryDark}`,
        padding: "16px",
        color: "#1a1a1a",
        background: "#fff",
        borderRadius: "16px",
        fontSize: "1.4rem",
        fontWeight: "500",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
    });
  },

  error: (message) => {
    toast.error(message, {
      style: {
        borderRadius: "16px",
        fontSize: "1.4rem",
        padding: "16px",
      },
    });
  },

  success: (message) => {
    toast.success(message, {
      style: {
        borderRadius: "16px",
        fontSize: "1.4rem",
        padding: "16px",
      },
    });
  },
};
