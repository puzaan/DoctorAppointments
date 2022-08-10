
const {doctorSchema}=require("../../database/doctor_schema");

const viewDoctorById=(req,res)=>{
    doctorSchema.findOne({doctorId:req.params.id}).exec((error,done)=>{
        if(error){
            res.status(500).json({"msg":"Server Error"});

        }else{
            if(!done){
                res.status(400).json({"msg":"No data found for given Id"})
            }else{
            res.status(200).json({"msg":"Doctor data fetched","data":done});
            }

        }
        

    });
    
};


module.exports={viewDoctorById}