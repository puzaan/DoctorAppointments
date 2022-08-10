const mongoose = require('mongoose');
const avialbaleDates=new mongoose.Schema({
    "date":String,
    "timeslot":String
},{_id:false});

const doctorScheema=new mongoose.Schema({
    "doctorId":{
        type:String,
        default:Date.now,
        unique:true
    },
"fee":String,
"password":String,
"token":String,
"fullName":String,
"password":String,
"dob":Date,
"gender":String,
"address":String,
"tag":[],
"contactNumber":[],
"emailId":{
    type:String,
    required:true
},
"role":{
    type:String,
    default:"doctor"
},
"Speciality":{
    type:String,

},
"educationBackground":[],
"NMC_number":String,
"affiliated_hospital":[],
"created_by_admin":String,
"profilePhotoLink":String,
"coverPhotoLink":String,
"videoList":[],
"available_dates":[avialbaleDates]
});



const doctorSchema=mongoose.model("doctorSchema",doctorScheema);




//this is doctor schema for meeting link
const doctorScheemaForMeeting=new mongoose.Schema({
    "doctorId":{
        type:String
        },
"fee":String,


"fullName":String,

"dob":Date,
"gender":String,
"address":String,
"tag":[],
"contactNumber":[],
"emailId":{
    type:String,
    
},
"role":{
    type:String,
    default:"doctor"
},
"Speciality":{
    type:String,

},
"educationBackground":[],
"NMC_number":String,
"affiliated_hospital":[],
"created_by_admin":String,
"profilePhotoLink":String,
"coverPhotoLink":String,

});






module.exports={doctorSchema,doctorScheemaForMeeting}