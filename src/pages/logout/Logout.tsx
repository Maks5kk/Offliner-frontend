import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Logout = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
  }, [logout]);
  return null;
};

export default Logout;
