const express = require('express');
const bookingRoute=express.Router();
const {createBooking}=require("../controller/bookingRequest/create");
const {editBooking,approveBooking, cancelBooking, viewAllBookingRequest,viewBookingRequestById,viewActiveRequest,viewInactiveRequest,deleteBookingRequest}=require("../controller/admin/bookingRequest/bookingRequestApprove");
const {adminVerification}=require("../middleware/adminVerification");
//public api
bookingRoute.post("/create",createBooking);


//Below are admin api and must have api key to user
bookingRoute.put("/approve/:id",adminVerification,approveBooking);
bookingRoute.put("/cancel/:id",adminVerification,cancelBooking);
//Edit user detail
bookingRoute.put("/edit/:id",adminVerification,editBooking);


//view booking request
bookingRoute.get("/view/all",adminVerification,viewAllBookingRequest);
bookingRoute.get("/view/:id",adminVerification,viewBookingRequestById);

bookingRoute.get("/view/active/request",adminVerification,viewActiveRequest);
bookingRoute.get("/view/inactive/request",adminVerification,viewInactiveRequest);
//delete booking request
bookingRoute.delete("/delete/:id",adminVerification,deleteBookingRequest);


module.exports={bookingRoute};
