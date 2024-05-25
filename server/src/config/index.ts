import dotenv from "dotenv";

dotenv.config();

interface Config {
  server: {
    port: string;
  };
  db: {
    url: string;
  };
  mail: {
    senderEmail: string;
    senderPassword: string;
  };
  salt: number;
  jwt: {
    secret: string;
    expTime: string;
  };
}

const config: Config = {
  server: {
    port: process.env.PORT || "3002",
  },
  db: {
    url: process.env.DATABASE_URL || "",
  },
  mail: {
    senderEmail: process.env.MAIL_SENDER_EMAIL || "",
    senderPassword: process.env.MAIL_SENDER_PASSWORD || "",
  },
  salt: parseInt(process.env.SALT_ROUNDS || "10"),
  jwt: {
    secret: process.env.TOKEN_SECRET || "secret",
    expTime: process.env.TOKEN_EXP_TIME || "24h",
  },
};

export default config;
