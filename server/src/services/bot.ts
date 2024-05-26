import TelegramBot from "node-telegram-bot-api";
import prisma from "../database";
import logger from "../utils/logger";
import config from "../config";

const bot = new TelegramBot(config.bot.token, {
  polling: true,
});

// entry point
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // get phone nimber for authentication
  bot.sendMessage(
    chatId,
    "Please share your phone number for authentication:",
    {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [
            {
              text: "Share phone number",
              request_contact: true,
            },
          ],
        ],
      },
    }
  );
});

// when receive contact (phone number), try to authenticate
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact?.phone_number;

  if (!phoneNumber) {
    return bot.sendMessage(chatId, "Can not get phone number");
  }

  const preparedPhoneNumber = preparePhoneNumber(phoneNumber);

  const admin = await prisma.user.findFirst({
    where: {
      role: "admin",
      phone: preparedPhoneNumber,
    },
  });

  if (!admin) {
    return bot.sendMessage(chatId, "Can not find admin with such phone number");
  }

  // set chat id
  await prisma.user.update({
    where: {
      id: admin.id,
    },
    data: {
      chatId: chatId,
    },
  });

  bot.sendMessage(
    chatId,
    "You have been successfully authenticated! Wait for notifications)"
  );
});

const preparePhoneNumber = (phone: string) => {
  return phone.split("").reverse().slice(0, 10).reverse().join("");
};

interface MessageOptions {
  chatId: number;
  text: string;
  email: string;
}

const sendMessage = (options: MessageOptions) => {
  bot.sendMessage(options.chatId, options.text, { parse_mode: "Markdown" });
  logger.info(`Message sent to admin. Chat id: ${options.chatId}`);
};

export { sendMessage };
