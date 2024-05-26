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
    host: string;
    port: number;
    senderEmail: string;
    senderPassword: string;
    service: string;
  };
  salt: number;
  jwt: {
    secret: string;
    expTime: string;
  };
  notifyAdmins: boolean;
}

const config: Config = {
  server: {
    port: process.env.PORT || "3002",
  },
  db: {
    url: process.env.DATABASE_URL || "",
  },
  mail: {
    host: process.env.MAIL_SENDER_HOST || "",
    port: parseInt(process.env.MAIL_SENDER_PORT || "587"),
    senderEmail: process.env.MAIL_SENDER_EMAIL || "",
    senderPassword: process.env.MAIL_SENDER_PASSWORD || "",
    service: process.env.MAIL_SENDER_SERVICE || "",
  },
  salt: parseInt(process.env.SALT_ROUNDS || "10"),
  jwt: {
    secret: process.env.TOKEN_SECRET || "secret",
    expTime: process.env.TOKEN_EXP_TIME || "24h",
  },
  notifyAdmins: process.env.NOTIFY_ADMINS === "true" || false,
};

export default config;
