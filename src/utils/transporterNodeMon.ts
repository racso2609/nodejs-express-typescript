import nodemailer = require('nodemailer');
require('dotenv').config();

export const transporter = nodemailer.createTransport({

  service: process.env.EMAIL_SERVICE,
  secure: true,
  auth:{
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PWD
  }
}) 
