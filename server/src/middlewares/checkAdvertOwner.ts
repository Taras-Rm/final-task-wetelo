import { NextFunction, Response } from "express";
import { getCurrentUserId } from "../utils/request";
import advertsService from "../services/adverts";
import { RequestWithParams } from "../types/request";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";

const checkAdvertOwner = async (
  req: RequestWithParams<{ id: string }>,
  _: Response,
  next: NextFunction
) => {
  try {
    const userId = getCurrentUserId(req);

    const advertId = parseInt(req.params.id);

    const advert = await advertsService.getAdvertById(advertId);
    if (!advert) {
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        `advert with id: ${advertId} not found`
      );
    }

    if (userId !== advert.userId) {
      throw new HttpException(
        HTTP_STATUS.FORBIDDEN,
        "user is not the owner of this advert"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkAdvertOwner;
