const {adminSchema}=require("../../../database/admin_schema");
const{testEmailSender}=require("../../../middleware/emailSender");
const jwt=require("jsonwebtoken");

const {secretKey}=require("../../../constants/jsonSecretKey");
const bycrpt=require("bcryptjs");
const forgotPassword=async(req,res)=>{
    //get Userid for given email
    let emailId=req.query["email"];
    let newPassword=req.query["newpassword"];
    let userData=await adminSchema.findOne({"email":emailId});
    let salt=bycrpt.genSaltSync(10);
    let hashPassword=bycrpt.hashSync(newPassword,salt);
    if(userData==null||userData===undefined){res.status(400).json({"status":"Fail","data":"Fail to find the given email id"})};
   
    
   let tokenGenerator=jwt.sign({"email":emailId,"password":hashPassword},secretKey,{expiresIn:"20m"});
    console.log(tokenGenerator);
     await testEmailSender(req,emailId,tokenGenerator);
    

    if(userData){
        res.status(200).json({"status":"Success","data":{"token":tokenGenerator}});
        return;
    };
    res.status(400).json({"status":"Fail","data":"No user with given email Id"});
};


module.exports={forgotPassword};