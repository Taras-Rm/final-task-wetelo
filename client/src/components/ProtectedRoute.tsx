import { useEffect } from "react";
import { useAppSelector } from "../state";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  const isLoginned = useAppSelector((state) => state.auth.isLoginned);

  useEffect(() => {
    if (!isLoginned) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
}

export default ProtectedRoute;
