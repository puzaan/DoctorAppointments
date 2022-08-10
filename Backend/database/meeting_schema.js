const mongoose = require('mongoose');
const {prescriptionScheema}=require("./prescription");
const {patientScheema}=require("./patient_schema");
const {doctorScheemaForMeeting}=require("./doctor_schema");
const meetingScheema=new mongoose.Schema({
    "meetingId":{
        type:String,
        default:Date.now
    },
    "pdfLink":{type:String,default:"test1.pdf"},
    "meetingLink":String,
    "prescription":prescriptionScheema,
    "active":{type:Boolean,
        default:true,
    },
    "patientDetail":patientScheema,
    "doctorDetail":doctorScheemaForMeeting,
    "createdBy":String,

},{timestamps:true});





const meetingSchema=mongoose.model("meetingSchema",meetingScheema);
module.exports={meetingSchema};