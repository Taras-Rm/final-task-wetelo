import { Router } from "express";
import usersController from "../controllers/users";
// import {
//   deleteUserValidator,
//   getUserValidator,
//   updateUserValidator,
//   verifyUserValidator,
// } from "../validators/users.js";

const router = Router();

router.get("/", usersController.getAllUsers);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
router.patch("/:id/verify", usersController.verifyUser);
router.get("/:id", usersController.getUser);

export default router;
