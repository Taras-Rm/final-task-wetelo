import { Router } from "express";
import HTTP_STATUS from "../utils/httpStatusCodes";
import auth from "../middlewares/auth";
import authRouter from "./auth";
import usersRouter from "./users";
import advertsRouter from "./adverts";

const router = Router();

// api healthcheck route
router.get("/ping", (req, res) => {
  res.status(HTTP_STATUS.OK).json({ message: "pong" });
});

router.use("/auth", authRouter);
router.use("/adverts", auth, advertsRouter);
router.use("/users", auth, usersRouter);

export default router;
