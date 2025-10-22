import nodemailer from "nodemailer";

export const createTransporter = ()=>{
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 2525),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendMail = async (to, subject, html)=>{
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  });
  console.log(`Email sent:`, info.messageID || info);
};