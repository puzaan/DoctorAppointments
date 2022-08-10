const {doctorSchema}=require("../../database/doctor_schema");
const bcrypt=require("bcryptjs");
//change gender address emailId role fullName NMC_number
const updateDoctorById=(req,res)=>{
    const doctorId=req.params.id;
    const {field,value}=req.body;
    
    doctorSchema.findOne({doctorId:doctorId}).exec((error,adminData)=>{
        if(error){res.status(500).json({"msg":"Server Error"})};
        console.log(doctorId,adminData);
        if(adminData){
            //gender value update
            if(field=="gender"){
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{gender:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Gender Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Gender update"});
                    }
                });
            }else if(field=="address"){
                //address update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{address:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Address Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Address update"});
                    }
                });
            }else if(field=="fee"){
                //address update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{fee:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Fee Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Fee update"});
                    }
                });
            }else if(field=="emailId"){
                //Email Id Update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{emailId:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Email Id Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Email Id update"});
                    }
                });
            }else if(field=="role"){
                //Role Update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{role:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Role Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Email Id update"});
                    }
                });
            }else if(field=="fullName"){
                //Full Name update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{fullName:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"Full Name Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in Full Name Update"});
                    }
                }); 
            }else if(field=="NMC_number"){
                //Full Name update
                doctorSchema.findOneAndUpdate({doctorId:doctorId},{NMC_number:value},function(error,done){
                    if(error){res.status(500).json({"msg":"Server Error"})};
                    if(done){
                       res.status(200).json({"msg":"NMC number Updated","data":done}); 
                    }else{
                        res.status(400).json({"msg":"Error in NMC number Update"});
                    }
                }); 
            }
            else{
                res.status(400).json({"msg":"No field Found"});
            }
           
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
        }
    })
       
        
    
   
};



const addContactNumber=(req,res)=>{
    const doctorId=req.params.id;
    const number=req.body.value;

    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$push:{contactNumber:number}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Number added","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const removeContactNumber=(req,res)=>{
    const doctorId=req.params.id;
    const number=req.params.number;

    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        
        if(done){
           console.log("doctorId"+doctorId,"number"+number);
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$pull:{contactNumber:number}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Number removed","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}

const addEducation=(req,res)=>{
    const doctorId=req.params.id;
    const institue=req.body.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$push:{educationBackground:institue}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"University/College added","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const removeEducation=(req,res)=>{
    const doctorId=req.params.id;
    const institue=req.body.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$pull:{educationBackground:institue}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"University/College Removed","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const addHospital=(req,res)=>{
    const doctorId=req.params.id;
    const hospital=req.query.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$push:{affiliated_hospital:hospital}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"New Hospital Added","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const deleteHospital=(req,res)=>{
    const doctorId=req.params.id;
    const hospital=req.query.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$pull:{affiliated_hospital:hospital}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Hospital Removed","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}

const addVideo=(req,res)=>{
    const doctorId=req.params.id;
    const video=req.body.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$push:{videoList:video}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"New Video Added","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const deleteVideo=(req,res)=>{
    const doctorId=req.params.id;
    const video=req.body.value;
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$pull:{videoList:video}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Video Removed","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}

const addDates=(req,res)=>{
    const doctorId=req.params.id;
    const date=req.query.date;
    const time=req.query.time;

    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$push:{available_dates:{date:date,timeslot:time}}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"New Date Added","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const deleteDates=(req,res)=>{
    const doctorId=req.params.id;
    const date=req.query.date;
   
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{$pull:{available_dates:{date:date}}});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Date Removed","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}
const updatePassword=async(req,res)=>{
    const doctorId=req.params.id;
    const password=req.query.password;
    
    doctorSchema.findOne({doctorId:doctorId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Server Error"});return;};
        if(done){
           //Generate hashpassword
        let salt=await bcrypt.genSalt(10);
        
        let hashPassword=bcrypt.hashSync(password,salt);
           await doctorSchema.findOneAndUpdate({"doctorId":done.doctorId},{password:hashPassword});
           const tempData=await doctorSchema.findOne({"doctorId":done.doctorId});
            res.status(200).json({"msg":"Doctor Password Updated","data":tempData});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
            return;
        }
    })
}







module.exports={updatePassword,updateDoctorById,addContactNumber,removeContactNumber,addEducation,removeEducation,addHospital,deleteHospital,addVideo,deleteVideo,addDates,deleteDates}