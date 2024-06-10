import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="min-h-screen w-screen p-6">
      <Header />
      <div className="h-full flex justify-center">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        theme="dark"
        closeOnClick
        draggable
      />
    </div>
  );
}

export default Layout;
