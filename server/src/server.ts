import app from "./app";
import config from "./config";

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
