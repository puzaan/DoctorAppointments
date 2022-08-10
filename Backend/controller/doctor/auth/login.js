const {doctorSchema}=require("../../../database/doctor_schema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const { secretKey } = require("../../../constants/jsonSecretKey");


const doctorLogin=async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    console.log("checking for login");
    var data=await doctorSchema.findOne({"emailId":email});
    try {
        if(data){
            const dbdata=data["password"];
            
            const compdata=bcrypt.compareSync(password,dbdata);
            //let token=jwt.sign({username:data["fullName"],email:data["emailId"]},secretKey);
            
            // await doctorSchema.findOneAndUpdate({"emailId":data["emailId"]},{"token":token});
            const tempdata=await doctorSchema.findOne({"emailId":data["emailId"]})
            if(compdata){
                res.status(200).json({"status":"Success","data":tempdata});
            }else{
                res.status(400).json({"status":"Fail","msg":"Valid Email but invalid password"});
            }
            
        }else{
            res.status(400).json({"status":"Fail","msg":"No user with given Email"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({"status":"Fail","msg":"Error in Login"});
    }
    

}







module.exports={doctorLogin};