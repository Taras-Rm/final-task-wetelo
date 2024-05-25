import { Router } from "express";
import usersController from "../controllers/users";
import {
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
  verifyUserValidator,
} from "../validators/users";

const router = Router();

router.get("/", usersController.getAllUsers);
router.put("/:id", updateUserValidator, usersController.updateUser);
router.delete("/:id", deleteUserValidator, usersController.deleteUser);
router.patch("/:id/verify", verifyUserValidator, usersController.verifyUser);
router.get("/:id", getUserValidator, usersController.getUser);

export default router;
