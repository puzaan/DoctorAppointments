
const mongoose = require('mongoose');

const admin=new mongoose.Schema({
    "adminId":{
        type:String,
        default:Date.now,
        unique:true
    },
"password":{
    type:String,
    default:"12345678"
},
"token":String,
"fullName":String,
"dob":{
    type:Date,
    required:true,
},
"gender":{
    type:String,
    required:true,
    enum:{
        values:["male","Male","MALE","Female","female","FEMALE","Other","other","others","Others","OTHER","M","F","m","f"],
        message:"GenderError",
    }
},
"address":{
    type:String,
},
"contactNumber":{
    type:String,
    required:true
},
"emailId":{
    unique:true,
    type:String,
    required:true,

},
"role":{type:String,default:"admin"},

},{timestamps:true});



const adminSchema=mongoose.model("adminSchema",admin);
module.exports={adminSchema}