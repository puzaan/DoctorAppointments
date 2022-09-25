const nodemailer = require("nodemailer");
const { emailId, password } = require("../GmailUser");

const testEmailSender = async (req, emailid, token) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <foo@example.com>', // sender address
    to: emailid, // list of receivers
    subject: "Password Reset Link From Xyba.health Website", // Subject line
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      "http://" +
      req.headers.host +
      "/api/v1/auth/admin/password/reset/" +
      token +
      "\n\n" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n", // plain text body
  });
};

const testEmailSenderDoctor = async (req, emailid, token) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <foo@example.com>', // sender address
    to: emailid, // list of receivers
    subject: "Password Reset Link From E-Commerce Website", // Subject line
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
      "http://" +
      req.headers.host +
      "/api/v1/auth/doctor/password/reset/handler/" +
      token +
      "\n\n" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n", // plain text body
  });
};

const testEmailSenderAdmin = async (req, emailid, passwordused) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <Doctor appointment@example.com>', // sender address
    to: emailid, // list of receivers
    subject: "Admin Created !!!Admin Credential!!!", // Subject line
    text:
      "You are receiving this because you (or someone else) have created account for you.\n\n" +
      "Please view below information about your credential:\n\n" +
      "Username:" +
      emailid +
      "\n\n" +
      "Password:" +
      passwordused +
      "\n\n" +
      "If you did not request this, please ignore this email.\n", // plain text body
  });
};

const sendPdfEmailSender = async (req, emailid, link, patientName, docName) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <ashishdhakal6@gmail.com>', // sender address
    to: emailid, // list of receivers
    subject: "Prescription pdf has been generated.", // Subject line
    text:
      "Dear: " +
      patientName +
      "\n\n" +
      "As per your request, you consultation with Dr. " +
      docName +
      "\n\n" +
      "Your Prescription has been Created" +
      "\n\n" +
      "Please follow the link to go to View your prescription:\n\n" +
      "Prescription Link:   " +
      link +
      "\n\n" +
      "If you did not request this meeting, please ignore this email.\n" +
      "\n\n\n" +
      "Thank you," +
      "\n" +
      "xyba Health Technologies", // plain text body
  });
};

const sendMeetingLink = async (
  req,
  emailid,
  link,
  dateRequested,
  timeRequested,
  patientName,
  docName
) => {
  //geting dateFrom dateRequested timestamp
  let dateTimestamp = new Date(dateRequested);
  let dateofAppointment = dateTimestamp.toLocaleDateString("en-US");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <ashishdhakal6@gmail.com>', // sender address
    to: emailid, // list of receivers
    subject: "Your Consultation with Xyba Doctor has been scheduled", // Subject line
    text:
      "Dear: " +
      patientName +
      "\n\n" +
      "As per your request, you consultation with Dr. " +
      docName +
      "has been scheduled" +
      "\n\n" +
      "Meeting Date:   " +
      dateofAppointment +
      "\n\n" +
      "Time:   " +
      timeRequested +
      "\n\n" +
      "Please follow the link to go to your meeting:\n\n" +
      "Meeting Link:   " +
      link +
      "\n\n" +
      "If you did not request this meeting, please ignore this email.\n" +
      "\n\n\n" +
      "Thank you," +
      "\n" +
      "xyba Health Technologies", // plain text body
  });
};

const doctorCreateEmailSender = async (req, emailid, passwordused) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });

  let info = await transporter.sendMail({
    from: '"noReply" <ashishdhakal6@gmail.com>', // sender address
    to: emailid, // list of receivers
    subject: "Doctor Created !!!Doctor Credential!!!", // Subject line
    text:
      "You are receiving this because you (or someone else) have created account for you.\n\n" +
      "Please view below information about your credential:\n\n" +
      "Username:  " +
      emailid +
      "\n\n" +
      "Password:  " +
      passwordused +
      "\n\n" +
      "If you did not request this, please ignore this email.\n", // plain text body
  });
};

const doctorApprovedEmailSender = async (req, emailid, passwordused) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });
  let link = "https://xyba.health/";
  let info = await transporter.sendMail({
    from: '"noReply" <ashishdhakal6@gmail.com>', // sender address
    to: emailid, // list of receivers
    subject: "!!!Your Credential is verified!!!", // Subject line
    text:
      "You are receiving this Mail because you Credentialhave been verifyed and created account for you.\n\n" +
      "Please view below information about your credential:\n\n" +
      "Username:  " +
      emailid +
      "\n\n" +
      "code:  " +
      passwordused +
      "\n\n" +
      "Meeting Link:   " +
      link +
      "\n\n" +
      "You need to change you password \n\n", // plain text body
  });
};

const doctorFirstPasswordChangeEmailSender = async (
  req,
  emailid,
  passwordused
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailId,
      pass: password,
    },
  });
  let link = "https://xyba.health/doctor/login";
  let info = await transporter.sendMail({
    from: '"noReply" <ashishdhakal6@gmail.com>', // sender address
    to: emailid, // list of receivers
    subject: "!!!Your Can login to our website!!!", // Subject line
    text:
      "You are receiving this Mail because you Credential have been verifyed and you have changed yor password for first time.\n\n" +
      "Please view below information about your credential:\n\n" +
      "Username:  " +
      emailid +
      "\n\n" +
      "password:  " +
      passwordused +
      "\n\n" +
      "Login Page:   " +
      link +
      "\n\n",
  });
};

module.exports = {
  doctorCreateEmailSender,
  sendMeetingLink,
  testEmailSender,
  testEmailSenderDoctor,
  testEmailSenderAdmin,
  sendPdfEmailSender,
  doctorApprovedEmailSender,
  doctorFirstPasswordChangeEmailSender,
};
