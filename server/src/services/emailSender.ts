import nodemailer from "nodemailer";
import config from "../config";
import handlebars from "handlebars";
import { TemplateName } from "../types/models";
import { templates } from "../templates/email";
import logger from "../utils/logger";

const transporter = nodemailer.createTransport({
  service: config.mail.service,
  host: config.mail.host,
  port: config.mail.port,
  secure: false,
  auth: {
    user: process.env.MAIL_SENDER_EMAIL,
    pass: process.env.MAIL_SENDER_PASSWORD,
  },
});

interface MailOptions {
  to: string;
  subject: string;
  templateName: TemplateName;
  context: any;
}

const prepareTemplate = (templateName: TemplateName, context: any) => {
  const template = handlebars.compile(templates[templateName]);

  return template(context);
};

const sendEmail = async (options: MailOptions) => {
  const html = prepareTemplate(options.templateName, options.context);

  const mailOptions = {
    from: process.env.MAIL_SENDER_EMAIL,
    to: options.to,
    subject: options.subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `Message sent to ${mailOptions.to}. Message id: ${info.messageId}`
    );
  } catch (error) {
    logger.error(`Sending mail error:  ${error}`);
  }
};

export { sendEmail };
