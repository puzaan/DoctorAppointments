const {superusername,superpassword,supertoken,superAdminUser}=require("../constants/superAdmin");
const {apiKey}=require("../constants/apiKey");
const verifySuperAdmin=(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(username==superusername && password==superpassword){
        res.status(200).json({"status":"Welcome Super Admin","toke":superAdminUser.token,"emaild":superAdminUser.emailId,"fullName":superAdminUser.fullName});
        return;
    }else{
        res.status(400).json({"status":"Sorry No user name and Id Matched"});
        return;
    }
}
module.exports={verifySuperAdmin};