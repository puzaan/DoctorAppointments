const nodemailer = require("nodemailer");
const {emailId,password}=require("../GmailUser");

 const testEmailSender=async(req,emailid,token)=>{
  
  
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
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + req.headers.host + '/api/v1/auth/admin/password/reset/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
, // plain text body
    
  });
  
 }


 const testEmailSenderDoctor=async(req,emailid,token)=>{
  
  
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
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + req.headers.host + '/api/v1/auth/doctor/password/reset/handler/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
, // plain text body
    
  });
  
 }





 const testEmailSenderAdmin=async(req,emailid,passwordused)=>{
  
  
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
    text: 'You are receiving this because you (or someone else) have created account for you.\n\n' +
    'Please view below information about your credential:\n\n' +
    'Username:'+ emailid + '\n\n' +
    'Password:'+passwordused+'\n\n'+
    'If you did not request this, please ignore this email.\n'
, // plain text body
    
  });
  
 }

 const sendPdfEmailSender=async(req,emailid,link)=>{
  
  
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
    subject: "Prescription pdf has been generated.", // Subject line
    text: 'You are receiving this because your prescription has been generated and stored in the database.\n\n' +
    'Now you can view your PRESCRIPTION pdf file by using below link\n\n' +
    
    'Please click on the following link, or paste this into your browser to complete the process :\n\n' +
    'PDF link:   '+ link + '\n\n' +
    'If you did not request this, please ignore this email.\n'
, // plain text body
    
  });
  
 }


 const sendMeetingLink=async(req,emailid,link,dateRequested,timeRequested)=>{
  //geting dateFrom dateRequested timestamp
  let dateTimestamp=new Date(dateRequested)
  let dateofAppointment=dateTimestamp.toString();
  
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
    subject: "Meeting Link has been generated.", // Subject line
    text: 'You are receiving this because your meeting has been fixed and stored in the database.\n\n' +
    'Now you can view your Meeting detail by using below link\n\n' +
    
    'Please click on the following link, or paste this into your browser to complete the process :\n\n' +
    'Meeting Link:   '+ link + '\n\n' +
    "Meeting Date:   "+dateofAppointment+"\n\n"+
    "Time slot alloted:   "+timeRequested+"\n\n"+
    'If you did not request this, please ignore this email.\n'
, // plain text body
    
  });
  
 }


 const doctorCreateEmailSender=async(req,emailid,passwordused)=>{
  
  
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
    subject: "Doctor Created !!!Doctor Credential!!!", // Subject line
    text: 'You are receiving this because you (or someone else) have created account for you.\n\n' +
    'Please view below information about your credential:\n\n' +
    'Username:  '+ emailid + '\n\n' +
    'Password:  '+passwordused+'\n\n'+
    'If you did not request this, please ignore this email.\n'
, // plain text body
    
  });
  
 }







  module.exports={doctorCreateEmailSender,sendMeetingLink,testEmailSender,testEmailSenderDoctor,testEmailSenderAdmin,sendPdfEmailSender};