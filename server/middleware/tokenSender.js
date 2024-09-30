import { createTransport } from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { sign } = jwt;

console.log(process.env.EMAIL_PASSWORD);
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'tagit.pwa@gmail.com',
    pass: 'hrcjxfddnxaofudc',
  },
});

const tokenGenerator = (name) => {
  const token = sign(
    {
      data: name,
    },
    process.env.VALIDATION_SECRET,
    { expiresIn: '10m' },
  );
  return token;
};

const validateToken = (token) => {
  const { data } = jwt.verify(token, process.env.VALIDATION_SECRET);
  return data;
};

const sendVerificationMail = (mail, token) => {
  const mailConfigurations = {
    from: 'tagit.pwa@gmail.com',

    to: mail,

    subject: 'Email Verification',

    text: `Hi! There, You have recently visited
             our website and entered your email.
             Please follow the given link to verify your email
             http://localhost:8080/verify?token=${token}
             Thanks`,
  };

  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
};

export { sendVerificationMail, tokenGenerator, validateToken };
