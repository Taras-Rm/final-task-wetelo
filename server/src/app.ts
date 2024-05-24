import express from "express";
import dotenv from "dotenv";
// import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

// app.use(errorHandler);

export default app;
