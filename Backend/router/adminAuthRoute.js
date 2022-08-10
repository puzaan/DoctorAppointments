
const express = require('express');

const adminAuthRoute=express.Router();
const {adminLogin}=require("../controller/admin/auth/login");
const {resetHandler}=require("../controller/admin/auth/resetHandler");
const {forgotPassword}=require("../controller/admin/auth/forgotPassword");
//admin login
adminAuthRoute.post("/login",adminLogin);
//Initiate the password reset by admin himself
adminAuthRoute.post("/forgot/password",forgotPassword);
//this is after user click the password reset email
adminAuthRoute.get("/password/reset/:resetToken",resetHandler);












module.exports={adminAuthRoute}