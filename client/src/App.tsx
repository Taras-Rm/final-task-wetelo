import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import UsersPage from "./pages/UsersPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./state";
import { loadTokenFromStorage, me } from "./state/auth";
import AdvertsPage from "./pages/AdvertsPage";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(me());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/adverts" element={<AdvertsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
