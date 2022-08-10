const {adminSchema}=require("../../database/admin_schema");

const deleteAdminById=async(req,res)=>{
    const adminId=req.params.id;
    try {
        const userdata=await adminSchema.findOneAndDelete({adminId:adminId});
        if(userdata){
            res.status(200).json({"msg":"Admin Deleted"});
        }else{
            res.status(400).json({"msg":"No user Found for Given Id"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({"msg":"Error in Deleting User"})
    }    
};

module.exports={deleteAdminById}