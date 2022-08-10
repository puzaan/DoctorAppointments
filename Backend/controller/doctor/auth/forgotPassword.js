const {doctorSchema}=require("../../../database/doctor_schema");
const{testEmailSenderDoctor}=require("../../../middleware/emailSender");
const jwt=require("jsonwebtoken");

const {secretKey}=require("../../../constants/jsonSecretKey");
const bycrpt=require("bcryptjs");
const forgotPassword=async(req,res)=>{
    //get Userid for given email
    let emailId=req.query["email"];
    let newPassword=req.query["newpassword"];
    let userData=await doctorSchema.findOne({"emailId":emailId});
    let salt=bycrpt.genSaltSync(10);
    let hashPassword=bycrpt.hashSync(newPassword,salt);
    if(userData==null||userData===undefined){res.status(400).json({"status":"Fail","msg":"Fail to find the given email id"});return;};
   
    
   let tokenGenerator=jwt.sign({"email":emailId,"password":hashPassword},secretKey,{expiresIn:"20m"});
    console.log(tokenGenerator);
     await testEmailSenderDoctor(req,emailId,tokenGenerator);
    

    if(userData){
        res.status(200).json({"status":"Success","msg":"forgot password selected"});
        return;
    };
    res.status(400).json({"status":"Fail","msg":"No user with given email Id"});
};

const resetHandler=async(req,res)=>{
    let resetToken=req.params.resetToken;
   
    
    try {

        const decodeData=jwt.decode(resetToken,secretKey);
        if(!decodeData){throw new Error("No user Id available")};
        const email=decodeData["email"];
        const password=decodeData["password"];
        let userData=await doctorSchema.findOne({"emailId":email});
       
        if(userData==null||userData===undefined){throw new Error("invalid user password change")};
        console.log(email,password);
        await doctorSchema.findOneAndUpdate({"emailId":email},{$set:{"token":""}});
        await doctorSchema.findOneAndUpdate({"emailId":email},{"password":password});
        res.status(200).type("html").sendFile("Success.html",{root:__dirname});
        
    } catch (error) {
        console.log(error);
        res.status(200).type("html").sendFile("Error.html",{root:__dirname});
    }
    
}


module.exports={forgotPassword,resetHandler};