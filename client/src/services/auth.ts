import { LoginT, RegistrationT, UserT } from "../types/type";
import api from "./api";

const login = async (data: LoginT) => {
  const response = await api.post<{ token: string }>("/auth/login", {
    ...data,
  });

  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const registration = async (data: RegistrationT) => {
  const response = await api.post<{ user: UserT }>("/auth/register", {
    ...data,
  });

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("token");
};

const me = async () => {
  const response = await api.get<UserT>("/auth/me");

  return response.data;
};

const authService = {
  login,
  registration,
  logout,
  me,
};

export default authService;
