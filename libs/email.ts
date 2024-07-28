import nodemailer from 'nodemailer';

import { DEFAULT_URL_API } from '@/routes';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const confirmLink = `${DEFAULT_URL_API}/authentification/nouvelle-verification?token=${token}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'Confirmez votre email',
      html: `<p>Cliquez <a href="${confirmLink}">ICI</a> pour confirmez votre email</p>`,
    });
  } catch {
    throw new Error(
      "Une erreur est survenue lors de l'envoie de l'email"
    );
  }
}
