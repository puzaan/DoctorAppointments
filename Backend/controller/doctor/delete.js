const {doctorSchema}=require("../../database/doctor_schema");

const deleteDoctorById=async(req,res)=>{
    const doctorId=req.params.id;
    try {
        const userdata=await doctorSchema.findOneAndDelete({doctorId:doctorId});
        if(userdata){
            res.status(200).json({"status":"Success","msg":"Admin Deleted"});
        }else{
            res.status(400).json({"status":"Fail","msg":"No user Found for Given Id"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({"status":"Fail","msg":"Error in Deleting User"})
    }    
};

module.exports={deleteDoctorById}