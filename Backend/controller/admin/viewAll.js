const {adminSchema}=require("../../database/admin_schema");

const viewAllAdmin=(req,res)=>{
    adminSchema.find({}).exec((error,done)=>{
        if(error){
            res.status(500).json({"msg":"Server Error"});

        }else{
            res.status(200).json({"msg":"All Admin data fetched","data":done});

        }

    });
    
};

module.exports={viewAllAdmin}