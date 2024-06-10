import { AdvertT, CreateAdvertT, UpdateAdvertT } from "../types/type";
import api from "./api";

const getAdverts = async () => {
  const response = await api.get<AdvertT[]>("/adverts");

  return response;
};

const deleteAdvert = async (id: number) => {
  const response = await api.delete(`/adverts/${id}`);

  return response;
};

const createAdvert = async (data: CreateAdvertT) => {
  const response = await api.post<AdvertT>("/adverts", {
    ...data,
  });

  return response.data;
};

const updateAdvert = async (id: number, data: UpdateAdvertT) => {
  const response = await api.put<AdvertT>(`/adverts/${id}`, {
    ...data,
  });

  return response.data;
};

const advertsService = {
  getAdverts,
  createAdvert,
  updateAdvert,
  deleteAdvert,
};

export default advertsService;
