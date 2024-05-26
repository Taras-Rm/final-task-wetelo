import nodemailer from "nodemailer";
import config from "../config";
import handlebars from "handlebars";
import { TemplateName } from "../types/models";
import { templates } from "../templates/email";

const transporter = nodemailer.createTransport({
  service: "gmail",
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
    console.log(
      `Message sent to ${mailOptions.to}. Message id: ${info.messageId}`
    );
  } catch (error) {
    console.log(`Sending mail error:  ${error}`);
  }
};

export { sendEmail };
