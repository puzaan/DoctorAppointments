
const {adminSchema}=require("../../database/admin_schema");

const viewAdminById=(req,res)=>{
    adminSchema.findOne({adminId:req.params.id}).exec((error,done)=>{
        if(error){
            res.status(500).json({"msg":"Server Error"});

        }else{
            if(!done){
                res.status(400).json({"msg":"No data found for given Id"})
            }else{
            res.status(200).json({"msg":"All Admin data fetched","data":done});
            }

        }
        

    });
    
};


module.exports={viewAdminById}