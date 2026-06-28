import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { getUserBasicInfo } from "../../services/userService";
import { popUp } from "../../utils/popUp";
import { LoadingState } from "../../shared/States";

export default function CompleteProfileRoute() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const data = await getUserBasicInfo(user.id);

        const hasSkills = data.skills?.length > 0;
        const hasRoles = data.techRoles?.length > 0;

        if (!hasSkills || !hasRoles) {
          popUp.error(
            "Please add at least one skill and one preferred role before creating a team."
          );
          setAllowed(false);
        } else {
          setAllowed(true);
        }
      } catch (err) {
        console.error(err);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      checkProfile();
    }
  }, [user]);

  if (loading) return <LoadingState />;

  return allowed ? <Outlet /> : <Navigate to="/userprofile" replace />;
}