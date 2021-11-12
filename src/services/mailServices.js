"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: "465",
  secure: true,
  auth: {
    user: "shrikrushanapingale@gmail.com",
    pass: "QpfkgP2k40zV",
  },
});
const send = (to, content, subject) => {
    return new Promise((resolve, reject) => {
        if (!content) return reject(new Error('fail because mail content was empty'));
        const options = {
          from: "shrikrushanapingale@gmail.com",
          to,
          subject,
          text: content,
        };
        return transport.sendMail(options, (error, info) => {
       
            if (error) {
              console.log(error)
                return reject(error)
            };
            return resolve(info);
        });
    });
};

module.exports = { send }
