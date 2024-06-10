import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state";
import { toast } from "react-toastify";
import { logout } from "../state/auth";
import RoleBadge from "./common/RoleBadge";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      navigate("/login");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="navbar mb-8 shadow-lg bg-base-300 rounded-box w-full sticky top-2 z-50 max-w-4xl mx-auto">
      {user && (
        <>
          <div className="navbar-start space-x-2">
            {user.role === "admin" && (
              <Link to={"/users"}>
                <span className="btn btn-ghost btn-sm rounded-btn">Users</span>
              </Link>
            )}
            <Link to={"/adverts"}>
              <span className="btn btn-ghost btn-sm rounded-btn">Adverts</span>
            </Link>
          </div>
          <div className="navbar-center"></div>
          <div className="navbar-end space-x-4">
            <div>{user.email}</div>
            <RoleBadge role={user.role} />
            <div className="btn" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
