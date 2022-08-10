const jwt=require("jsonwebtoken");
const {secretKey}=require("../../../constants/jsonSecretKey");
const {adminSchema}=require("../../../database/admin_schema");
const fs=require("fs");
const path= require('path');
// const successPath=path.join(__dirname,"Success.html");
// const failurePath=path.join(__dirname,"Error.html");
// const successPage=fs.readFileSync(successPath,"utf8");
// const ErrorPage=fs.readFileSync(failurePath,"utf8");
const resetHandler=async(req,res)=>{
    let resetToken=req.params.resetToken;
    console.log(resetToken);
   
    
    try {

        const decodeData=jwt.decode(resetToken,secretKey);
        if(!decodeData){throw new Error("No user Id available")};
        const email=decodeData["email"];
        const password=decodeData["password"];
        let userData=await adminSchema.findOne({"emailId":email});
       
        if(userData==null||userData===undefined){throw new Error("invalid user password change")};
        console.log(email,password);
        await adminSchema.findOneAndUpdate({"emailId":email},{$set:{"token":""}});
        await adminSchema.findOneAndUpdate({"emailId":email},{"password":password});
        res.status(200).type("html").sendFile("Success.html",{root:__dirname});
        
    } catch (error) {
        console.log(error);
        res.status(200).type("html").sendFile("Error.html",{root:__dirname});
    }
    

}




module.exports={resetHandler};