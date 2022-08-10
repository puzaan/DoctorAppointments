const {adminSchema}=require("../../database/admin_schema");
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const secretkey=require("../../constants/jsonSecretKey");

const updateAdminById=(req,res)=>{
    const adminId=req.params.id;
    
    const {field,value}=req.body;
    
    adminSchema.findOne({adminId:adminId}).exec((error,adminData)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(adminData){
            //gender value update
            if(field=="gender"){
                adminSchema.findOneAndUpdate({adminId:adminId},{gender:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Gender Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Gender update"});
                    }
                });
            }else if(field=="address"){
                //address update
                adminSchema.findOneAndUpdate({adminId:adminId},{address:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Address Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Address update"});
                    }
                });
            }else if(field=="contactNumber"){
                //contact Number update
                adminSchema.findOneAndUpdate({adminId:adminId},{contactNumber:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Contact Number Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Contact Number update"});
                    }
                });
            }else if(field=="emailId"){
                //Email Id Update
                adminSchema.findOneAndUpdate({adminId:adminId},{emailId:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Email Id Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Email Id update"});
                    }
                });
            }else if(field=="role"){
                //Role Update
                adminSchema.findOneAndUpdate({adminId:adminId},{role:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Role Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Email Id update"});
                    }
                });
            }else if(field=="fullName"){
                //Full Name update
                adminSchema.findOneAndUpdate({adminId:adminId},{fullName:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Full Name Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Full Name Update"});
                    }
                }); 
            }else{
                res.status(400).json({"msg":"No field Found"});
            }
           
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
        }
    })
       
        
    
   
};


const adminPasswordChange=async (req,res)=>{
    const adminId=req.params.id;
    const password=req.query.password;
    
    adminSchema.findOne({adminId:adminId}).exec(async(error,adminData)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(adminData){
            let salt=await bcrypt.genSalt(10);
            let hashPassword=bcrypt.hashSync(password,salt);
            await adminSchema.findOneAndUpdate({adminId:adminId},{password:hashPassword});
            res.status(200).json({"msg":"Password Change Successful!!"});
        }else{
            res.status(400).json({"msg":"No data found for given admin id"});
        }
    });
}

module.exports={updateAdminById,adminPasswordChange}