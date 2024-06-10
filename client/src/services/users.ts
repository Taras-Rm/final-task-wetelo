import { UpdateUserT, UserT } from "../types/type";
import api from "./api";

const getUsers = async () => {
  const response = await api.get<UserT[]>("/users");

  return response;
};

const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);

  return response;
};

const verifyUser = async (id: number) => {
  const response = await api.patch(`/users/${id}/verify`);

  return response;
};

const updateUser = async (id: number, data: UpdateUserT) => {
  const response = await api.put<UserT>(`/users/${id}`, {
    ...data,
  });

  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
  verifyUser,
  updateUser,
};

export default usersService;
