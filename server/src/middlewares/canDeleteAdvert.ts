import { NextFunction, Response } from "express";
import { RequestWithParams } from "../types/request";
import advertsService from "../services/adverts";
import { getCurrentUserInfo } from "../utils/request";
import HttpException from "../errors/httpException";
import HTTP_STATUS from "../utils/httpStatusCodes";

// canDeleteAdvert middleware checks if current user is admin or advert creator id equal current user id
const canDeleteAdvert = async (
  req: RequestWithParams<{ id: string }>,
  _: Response,
  next: NextFunction
) => {
  try {
    const { id: userId, role: userRole } = getCurrentUserInfo(req);

    const advertId = parseInt(req.params.id);

    const advert = await advertsService.getAdvertById(advertId);
    if (!advert) {
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        `advert with id: ${advertId} not found`
      );
    }

    // only if admin or advert creator
    if (userRole !== "admin" && userId !== advert.userId) {
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

export default canDeleteAdvert;
