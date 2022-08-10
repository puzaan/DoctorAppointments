const mongoose = require('mongoose');
const patientScheema=new mongoose.Schema({
"patientName":String,
"patientEmail":String,
"message":"String",
 "gender":{
        type:String
    },
    "age":String,
    "address":String,
    "occupation":String,
    "phoneNumber":{
        type:String,
        required:true
    },
    
    "dateRequested":Date,
    "timeRequested":String,
},{_id:false});

function patientObject(patientName,patientEmail,age,gender,occupation,message,address,phoneNumber,dateRequested,timeRequested){
    this.patientName=patientName;
    this.age=age;
    this.gender=gender;
    this.occupation=occupation;
    this.message=message;
    this.address=address;
    this.phoneNumber=phoneNumber;
    this.dateRequested=dateRequested;
    this.timeRequested=timeRequested;
    this.patientEmail=patientEmail;
}




module.exports={patientScheema,patientObject};

