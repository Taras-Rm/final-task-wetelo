import { Router } from "express";
import authController from "../controllers/auth";
// import auth from "../middlewares/auth.js";
// import { loginValidator, registerValidator } from "../validators/auth.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);

export default router;
