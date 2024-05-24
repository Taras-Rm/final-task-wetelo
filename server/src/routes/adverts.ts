import { Router } from "express";
import advertsController from "../controllers/adverts";
// import {
//   createAdvertValidator,
//   deleteAdvertValidator,
//   updateAdvertValidator,
// } from "../validators/adverts.js";
// import checkVerification from "../middlewares/checkVerification";

const router = Router();

router.get("/", advertsController.getAllAdverts);
router.post(
  "/",
  // checkVerification,
  // createAdvertValidator,
  advertsController.createAdvert
);
router.put(
  "/:id",
  // checkVerification,
  // updateAdvertValidator,
  advertsController.updateAdvert
);
router.delete(
  "/:id",
  // checkVerification,
  // deleteAdvertValidator,
  advertsController.deleteAdvert
);

export default router;
