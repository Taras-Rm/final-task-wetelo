import app from "./app";
import config from "./config";
import logger from "./utils/logger";

const PORT = config.server.port;

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});
