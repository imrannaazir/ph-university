import nodemailer from 'nodemailer';
import config from '../config';
import { TEmailPayload } from '../interface/interface';
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.my_email_address,
    pass: config.email_app_password,
  },
});
const sendEmail = async (payload: TEmailPayload) => {
  const { receiver, html, subject, text } = payload;
  try {
    const info = await transporter.sendMail({
      from: config.my_email_address, // sender address
      to: receiver, // receiver email
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log(info.messageId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export default sendEmail;
