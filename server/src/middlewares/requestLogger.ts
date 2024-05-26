import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    logger.info(`${method} ${url} status: ${statusCode} - ${duration}ms`);
  });

  next();
};

export default requestLogger;
