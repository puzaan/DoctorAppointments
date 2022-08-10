const {doctorSchema}=require("../../database/doctor_schema");

const viewAllDoctor=(req,res)=>{
    doctorSchema.find({}).exec((error,done)=>{
        if(error){
            res.status(500).json({"msg":"Server Error"});

        }else{
            res.status(200).json({"msg":"All Doctor data fetched","data":done});

        }

    });
    
};

module.exports={viewAllDoctor}