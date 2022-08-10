const express = require('express');
const doctorPublicRoute=express.Router();
const {viewAllDoctor}=require("../controller/doctor/viewAll");
const {viewDoctorByNameAndTag,addTagById,deleteTagById,viewAvailableDates,viewAvailableTime}=require("../controller/doctor/doctorByNameAndTag");
doctorPublicRoute.get("/view/all",viewAllDoctor);
doctorPublicRoute.get("/view/doctor/:alphabet",viewDoctorByNameAndTag);
doctorPublicRoute.get("/view/dates/:id",viewAvailableDates);
doctorPublicRoute.get("/view/timestamp/:id",viewAvailableTime);

module.exports={doctorPublicRoute};