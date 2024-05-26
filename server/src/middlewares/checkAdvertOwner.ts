import { NextFunction, Response } from "express";
import { getCurrentUserInfo } from "../utils/request";
import advertsService from "../services/adverts";
import { RequestWithParams } from "../types/request";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";

// checkAdvertOwner middleware checks if advert creator id equal current user id
const checkAdvertOwner = async (
  req: RequestWithParams<{ id: string }>,
  _: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = getCurrentUserInfo(req);

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
