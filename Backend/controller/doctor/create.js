const {doctorSchema}=require("../../database/doctor_schema");
const bcrypt=require("bcryptjs");
const {doctorCreateEmailSender}=require("../../middleware/emailSender");
const jwt=require("jsonwebtoken");
const secretkey=require("../../constants/jsonSecretKey");

const createDoctor=async (req,res)=>{
    let{password}=req.body;
    let created_by_admin=req.createdBy;
    let coverPhotoLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACGFpr0iqURE_6EHYMm-AGXfhXC1Nzf4ucA&usqp=CAU";
    let profilePhotoLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACGFpr0iqURE_6EHYMm-AGXfhXC1Nzf4ucA&usqp=CAU";
    const {fullName,dob,gender,address,fee,contactNumber,emailId,role,speciality,educationBackground,NMC_number,Affiliated_Hospital,videoList}=req.body;
    //setting default password
    const savetoken=jwt.sign({fullName,emailId},secretkey.secretKey);
    let salt=await bcrypt.genSalt(10);
    if(!password){password='12345678'}
    let hashPassword=bcrypt.hashSync(password,salt);
    doctorSchema.findOne({emailId:emailId}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
        if(done){
            res.status(400).json({"msg":"Email Id in use"});
        }else{
            console.log(done);
    doctorSchema.create({
        fullName:fullName,
        token:savetoken,
        password:hashPassword,
        dob:dob,
        gender:gender,
        address:address,
        fee:fee,
        contactNumber:contactNumber,
        emailId:emailId,
        role:role,
        speciality:speciality,
        educationBackground:educationBackground,
        NMC_number:NMC_number,
        Affiliated_Hospital:Affiliated_Hospital,
        created_by_admin:created_by_admin,
        videoList:videoList,
        profilePhotoLink:profilePhotoLink,
        coverPhotoLink:coverPhotoLink,

    },async function(error,done){
        if(error){
           if(error.name=="ValidationError"){console.log(error);res.status(400).json({"msg":"Please enter valid value for given field"});return;};
            res.status(400).json({"msg":"Error in creating database"});
            
        }else{
            doctorCreateEmailSender(req,emailId,password);
            res.status(200).json({"msg":"Database  Created","data":done});
        }
    })
    }
    })
 
};


module.exports={createDoctor}