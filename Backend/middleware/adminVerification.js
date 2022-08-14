const {apiKey}=require("../constants/apiKey");
const {adminSchema}=require("../database/admin_schema");
const {doctorSchema}=require("../database/doctor_schema");
const adminVerification=(req,res,next)=>{
    const apiKeyUsed=req.headers["api_key"];
    //debug purpose only
    console.log(apiKey+"used api key"+apiKeyUsed);

    if(apiKey===apiKeyUsed){
        //for debug only
        //console.log("Valid Api key Super User");
        //upto here
        req.createdBy="SuperAdmin";
        req.adminId=1
        next();
    }else{
        adminSchema.findOne({"token":apiKeyUsed}).exec((error,done)=>{
            if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
            //debug purpose only
            //console.log("done value"+done);
            //upto here
            if(done){
              
                console.log("valid token from admin user");
                req.createdBy=done.fullName;
                req.adminId=done.adminId;
                next();
            }else{
                console.log("no valid api key used..part"+"done"+done);
                console.log("error if:"+error);
                res.status(400).json({"msg":"No valid api Key Used"});
                return;
            }
        })
    }
   
};
const adminDoctorVerification=(req,res,next)=>{
    const apiKeyUsed=req.headers["api_key"];
    //checking for super admin api key
    if(apiKey===apiKeyUsed){
        console.log("Valid Api key Super User");
        req.doctorData={"fullName":"Super Admin","doctorId":"1"}
        next();
    }else{
        //checking for admin api key 
        adminSchema.findOne({"token":apiKeyUsed}).exec((error,done)=>{
            if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
            if(done){
                console.log("valid token from admin user");
                req.doctorData=done
                next();
            }else{
                //checking for doctor api key
                doctorSchema.findOne({"token":apiKeyUsed}).exec((error,done)=>{
                    if(error){console.log(error);res.status(500).json({"msg":"Internal Server Error"});return;};
                    if(done){
                        console.log("valid token from doctor");
                        req.doctorData=done;
                        next();
                    }else{
                        res.status(400).json({"msg":"No valid api Key Used"});
                    }
                })
                
                return;
            }
        })
    }
   
}

module.exports={adminVerification,adminDoctorVerification};