import { Router } from "express";
import authController from "../controllers/auth";
import auth from "../middlewares/auth";
import { loginValidator, registerValidator } from "../validators/auth.js";

const router = Router();

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.get("/me", auth, authController.me);

export default router;
