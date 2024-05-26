import { Response, Router } from "express";
import HTTP_STATUS from "../utils/httpStatusCodes";
import auth from "../middlewares/auth";
import authRouter from "./auth";
import usersRouter from "./users";
import advertsRouter from "./adverts";
import authorizeRole from "../middlewares/authorizeRole";

const router = Router();

// api healthcheck route
router.get("/ping", (_, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ message: "pong" });
});

router.use("/auth", authRouter);
router.use("/users", auth, authorizeRole(["admin"]), usersRouter);
router.use("/adverts", auth, advertsRouter);

export default router;
