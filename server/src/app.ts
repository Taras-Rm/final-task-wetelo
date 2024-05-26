import express from "express";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes/index";
import cors from "cors";
import requestLogger from "./middlewares/requestLogger";

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
