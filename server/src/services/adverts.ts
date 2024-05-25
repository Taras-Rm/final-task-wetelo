import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { CreateAdvert, UpdateAdvertById } from "../types/types";
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
}: CreateAdvert) => {
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
}: UpdateAdvertById) => {
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
};
