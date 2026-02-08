require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendSignupMail = async (emailid, name) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: emailid,
      subject: "Registration Successful",
      text: `
Dear ${name},
Your registration at the foodies website is successful. 
You can now avail the services provided by the restaurant. 
Use your registered username and password to login.

Thank you...
Team Foodies`,
    });

    console.log("Signup email sent:", info.response);
  } catch (error) {
    console.log("Error sending signup email:", error);
    throw error;
  }
};

const sendVFCodeMail = async (emailid, vfcode) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: emailid,
      subject: "Reset Password",
      text: `
A request to reset the password for your foodies online account was initiated. 
Use the following verification code to reset your password.

${vfcode}

Thank you...
Team Foodies`,
    });

    console.log("Verification code email sent:", info.response);
  } catch (error) {
    console.log("Error sending verification email:", error);
    throw error;
  }
};

module.exports = {
  sendSignupMail,
  sendVFCodeMail,
};
