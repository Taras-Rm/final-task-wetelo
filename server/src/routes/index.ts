import { Router } from "express";
import HTTP_STATUS from "../utils/httpStatusCodes";
import authRouter from "./auth";

const router = Router();

// api healthcheck route
router.get("/ping", (req, res) => {
  res.status(HTTP_STATUS.OK).json({ message: "pong" });
});

router.use("/auth", authRouter);
// router.use("/adverts", auth, advertsRouter);
// router.use("/users", auth, authorizeRole(["admin"]), usersRouter);

export default router;
