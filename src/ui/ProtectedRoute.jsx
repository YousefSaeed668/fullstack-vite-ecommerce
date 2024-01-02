import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, type }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login"); // navigate not allowed to use in top level only in callback or useEffect Or something Like that
      } else if (
        type === "admin" &&
        user.uid !== import.meta.env.VITE_APP_ADMIN_UID
      ) {
        navigate("/404");
      }
    }
  }, [user, type, isLoading, navigate]);

  if (user) return children;
  return null; // return null while waiting for user data to load
}

export default ProtectedRoute;
