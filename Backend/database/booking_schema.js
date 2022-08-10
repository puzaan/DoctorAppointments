const mongoose = require('mongoose');

const bookingSchemaa=new mongoose.Schema({
    "requestId":{
        type:String,
        default:Date.now
    },
    "fullName":String,
    "occupation":String,
    "message":String,
    "age":Date,
    "sex":String,
    "contact":String,
    "email":String,
    "address":String,
    "doctorId":String,
    "bookingdate":Date,
    "timeslot":String,
    "approved":{
        type:Boolean,
        default:false
    },
    "approvedBy":{
        type:String,
        default:""
    }
},{timestamps:true});







const bookingSchema=mongoose.model("bookingSchema",bookingSchemaa);

module.exports={bookingSchema};