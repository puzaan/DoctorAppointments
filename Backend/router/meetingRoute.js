const express = require('express');
const {adminVerification,adminDoctorVerification}=require("../middleware/adminVerification");
const meetingRouter=express.Router();
const {createMeeting,updatePrescription,viewAllMeeting,viewPdfToClient,viewForGivenDoctorId,viewActiveMeetingForGivenDoctorId,viewForGivenMeetingId,sendPdfToClient, deleteMeeting}=require("../controller/meeting/create");
meetingRouter.post("/create",adminDoctorVerification,createMeeting);
//prescription update using this link
//after prescription is updated meeting is closed
meetingRouter.put("/update/prescription/:id",updatePrescription);
//send prescription to client using sms/using meeting id
meetingRouter.get("/send/pdf/:id",sendPdfToClient);
meetingRouter.get("/view/pdf/:id",viewPdfToClient);


//view all meeting
//only admin can see all the meeting
meetingRouter.get("/view/all",adminVerification,viewAllMeeting);
//view only active meeting for given dotor id
meetingRouter.get("/view/active/:id",adminDoctorVerification,viewActiveMeetingForGivenDoctorId);
//view specific meeting by doctor 

//view all archieve meeting for given doctor id
meetingRouter.get("/view/:id",adminDoctorVerification,viewForGivenDoctorId);
//view meeting detail by meeting Id
meetingRouter.get("/view/meeting/:id",adminDoctorVerification,viewForGivenMeetingId);

//delete meetinh
meetingRouter.delete(
  "/delete/meeting/:id",
  adminDoctorVerification,
  deleteMeeting
);



module.exports={meetingRouter};