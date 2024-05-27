import { ParseMode } from "node-telegram-bot-api";

const getAuthenticationRequestOptions = () => {
  return {
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
  };
};

const getVerifyUserOptions = (userId: number, callbackDataPrefix: string) => {
  return {
    parse_mode: "Markdown" as ParseMode,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Verify",
            callback_data: callbackDataPrefix + userId.toString(),
          },
          {
            text: "Verify later",
            callback_data: callbackDataPrefix + "later",
          },
        ],
      ],
    },
  };
};

export { getAuthenticationRequestOptions, getVerifyUserOptions };
