import { Router } from "express";
import advertsController from "../controllers/adverts";
import {
  createAdvertValidator,
  deleteAdvertValidator,
  idParamValidator,
  updateAdvertValidator,
} from "../validators/adverts";
import checkVerification from "../middlewares/checkVerification";
import checkAdvertOwner from "../middlewares/checkAdvertOwner";
import canDeleteAdvert from "../middlewares/canDeleteAdvert";

const router = Router();

router.get("/", advertsController.getAllAdverts);
router.post(
  "/",
  checkVerification,
  createAdvertValidator,
  advertsController.createAdvert
);
router.put(
  "/:id",
  checkVerification,
  idParamValidator,
  checkAdvertOwner,
  updateAdvertValidator,
  advertsController.updateAdvert
);
router.delete(
  "/:id",
  checkVerification,
  idParamValidator,
  canDeleteAdvert,
  deleteAdvertValidator,
  advertsController.deleteAdvert
);

export default router;
