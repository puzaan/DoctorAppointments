const {adminSchema}=require("../../database/admin_schema");
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const secretkey=require("../../constants/jsonSecretKey");
const {testEmailSenderAdmin}=require("../../middleware/emailSender");


const createAdmin=async (req,res)=>{
   let {password}=req.body;
    const {fullName,dob,gender,address,contactNumber,emailId,role,profileImage,coverImage}=req.body;
    const savetoken=jwt.sign({fullName,emailId},secretkey.secretKey);
    let salt=await bcrypt.genSalt(10);
    if(!password){password='12345678'}
    let hashPassword=bcrypt.hashSync(password,salt);
    adminSchema.findOne({"emailId":emailId}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
        console.log(done);
        if(!done){
    adminSchema.create({
        fullName:fullName,
        dob:dob,
        gender:gender,
        address:address,
        contactNumber:contactNumber,
        emailId:emailId,
        role:role,
        profileImage:profileImage,
        coverImage:coverImage,
        token:savetoken,
        password:hashPassword
    },function(error,done){
        if(error){
            console.log(error);
           if(error.name=="ValidationError"){res.status(400).json({"msg":"Please enter valid value for gender or dob value"});return;};
            res.status(400).json({"msg":"Error in creating database"});
            
        }else{
           // testEmailSenderAdmin(req,emailId,password)
            res.status(200).json({"msg":"Database  Created","data":done})
        }
    })
}else{
    res.status(400).json({"msg":"Email in use"});
}
})
    
 
};


module.exports={createAdmin}