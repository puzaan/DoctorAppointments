const express = require('express');
const doctorAuthRoute=express.Router();
const {doctorLogin, newdoctorLogin}=require("../controller/doctor/auth/login");
const {forgotPassword,resetHandler}=require("../controller/doctor/auth/forgotPassword");
doctorAuthRoute.post("/login",doctorLogin);
doctorAuthRoute.post("/login/newDoctor", newdoctorLogin);

doctorAuthRoute.post("/forgot/password",forgotPassword);

doctorAuthRoute.get("/password/reset/handler/:resetToken",resetHandler);


module.exports={doctorAuthRoute}