import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { CreateAdvertModel, UpdateAdvertByIdModel } from "../types/models";
import prisma from "../database";

const getAllAdverts = async () => {
  const adverts = await prisma.advert.findMany();

  return adverts;
};

const createAdvert = async ({
  title,
  description,
  price,
  userId,
}: CreateAdvertModel) => {
  const advert = await prisma.advert.create({
    data: {
      title,
      description,
      price,
      userId,
    },
  });

  return advert;
};

const updateAdvertById = async ({
  id,
  title,
  description,
  price,
}: UpdateAdvertByIdModel) => {
  const advert = await prisma.advert.update({
    data: {
      title,
      description,
      price,
    },
    where: {
      id,
    },
  });

  return advert;
};

const getAdvertById = async (id: number) => {
  const advert = await prisma.advert.findFirst({
    where: {
      id,
    },
  });

  return advert;
};

const deleteAdvertById = async (id: number) => {
  const advertForDelete = await prisma.advert.findFirst({
    where: {
      id,
    },
  });

  if (!advertForDelete) {
    throw new HttpException(
      HTTP_STATUS.NOT_FOUND,
      `advert with id: ${id} not found`
    );
  }

  const advert = await prisma.advert.delete({
    where: {
      id,
    },
  });

  return advert.id;
};

export default {
  getAllAdverts,
  createAdvert,
  updateAdvertById,
  deleteAdvertById,
  getAdvertById,
};
