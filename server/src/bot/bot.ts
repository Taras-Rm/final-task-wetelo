import TelegramBot from "node-telegram-bot-api";
import logger from "../utils/logger";
import config from "../config";
import { preparePhoneNumber } from "../utils/helper";
import {
  getAuthenticationRequestOptions,
  getVerifyUserOptions,
} from "./options";
import usersService from "../services/users";

const verifyPrefix = "verify_";

const bot = new TelegramBot(config.bot.token, {
  polling: true,
});

const authenticationRequest = async (chatId: number) => {
  await bot.sendMessage(
    chatId,
    "Please share your phone number for authentication:",
    getAuthenticationRequestOptions()
  );
};

const startBot = () => {
  bot.setMyCommands([{ command: "/start", description: "Authentication" }]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
      if (text === "/start") {
        // request phone number for authentication
        return authenticationRequest(chatId);
      }
    } catch (error) {
      logger.error("Bot error: ", error);
      bot.sendMessage(chatId, "Some error occured");
    }
  });

  bot.on("contact", async (msg) => {
    const chatId = msg.chat.id;
    const phoneNumber = msg.contact?.phone_number;

    try {
      if (!phoneNumber) {
        return bot.sendMessage(chatId, "Can not get phone number");
      }

      await usersService.setAdminChatIdByPhone(
        preparePhoneNumber(phoneNumber),
        chatId
      );

      bot.sendMessage(chatId, "You have been successfully authenticated!");
      bot.sendMessage(
        chatId,
        "Here you will receice notifications about new users registered in the system."
      );
    } catch (error) {
      logger.error("Bot error: ", error);
      bot.sendMessage(chatId, "Some error occured");
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message?.chat.id;
    const messageId = msg.message?.message_id;

    if (!chatId || !chatId) {
      logger.error("can't get chat id or message id");
      return;
    }

    if (!data) {
      logger.error("can't get data from message");
      return;
    }

    try {
      if (data.startsWith(verifyPrefix)) {
        const info = data.substring(verifyPrefix.length);

        // check verify now (received id) or later
        if (info === "later") {
          bot.sendMessage(chatId, "Ok! You can verify user later.");
        } else {
          const id = parseInt(data.substring(7));

          await usersService.verifyUserById(id);

          bot.sendMessage(chatId, "*User verified!*", {
            parse_mode: "Markdown",
          });
        }

        return bot.editMessageReplyMarkup(
          { inline_keyboard: [] },
          { chat_id: chatId, message_id: messageId }
        );
      }
    } catch (error) {
      logger.error("Bot error: ", error);
      bot.sendMessage(chatId, "Some error occured");
    }
  });
};

interface MessageOptions {
  chatId: number;
  context: {
    id: number;
    name: string;
    email: string;
  };
}

const sendVerifyUserMessage = (options: MessageOptions) => {
  const text = `New user *${options.context.name}* already registered in the system with email *${options.context.email}*. Please check and verify`;

  try {
    bot.sendMessage(
      options.chatId,
      text,
      getVerifyUserOptions(options.context.id, verifyPrefix)
    );
    logger.info(`Message sent to admin. Chat id: ${options.chatId}`);
  } catch (error) {
    logger.error("Bot error: ", error);
    bot.sendMessage(options.chatId, "Some error occured");
  }
};

export { sendVerifyUserMessage };
export default startBot;
