import { NextFunction, Request, Response } from "express";
import advertsService from "../services/adverts";
import HTTP_STATUS from "../utils/httpStatusCodes";
import { getCurrentUserId } from "../utils/request";
import { RequestWithBody } from "../types/request";
import { CreateAdvertModel } from "../types/models";

// get all adverts
const getAllAdverts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const adverts = await advertsService.getAllAdverts();

    res.status(HTTP_STATUS.OK).json(adverts);
  } catch (error) {
    next(error);
  }
};

// create a new advert
const createAdvert = async (
  req: RequestWithBody<CreateAdvertModel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price } = req.body;

    const userId = getCurrentUserId(req);

    const createdAdvert = await advertsService.createAdvert({
      title,
      description,
      price: price,
      userId: userId,
    });

    res.status(HTTP_STATUS.CREATED).json(createdAdvert);
  } catch (error) {
    next(error);
  }
};

// update an advert
const updateAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price } = req.body;
    const { id } = req.params;

    const advert = await advertsService.updateAdvertById({
      id: parseInt(id),
      title,
      description,
      price,
    });

    res.status(HTTP_STATUS.OK).json(advert);
  } catch (error) {
    next(error);
  }
};

// delete an advert
const deleteAdvert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const advertId = parseInt(id);

    await advertsService.deleteAdvertById(advertId);

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default { getAllAdverts, createAdvert, updateAdvert, deleteAdvert };
