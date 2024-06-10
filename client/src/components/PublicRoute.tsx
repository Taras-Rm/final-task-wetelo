import { useEffect } from "react";
import { useAppSelector } from "../state";
import { Outlet, useNavigate } from "react-router-dom";

function PublicRoute() {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/adverts");
    }
  }, [token, navigate]);


  return <Outlet />;
}

export default PublicRoute;
