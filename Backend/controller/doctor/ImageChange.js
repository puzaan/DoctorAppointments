const {doctorSchema}=require("../../database/doctor_schema");
const {imageUrl}=require("../../constants/imageUrl");
const profileImageChange=(req,res)=>{
    if (req.file) {
        var secure_url = process.env.HOST_ADDRESS + "/"+req.file.path;
        const doctorId=req.params.id;
        //updating the user image to db
        doctorSchema.findOneAndUpdate({doctorId:doctorId},{profilePhotoLink:secure_url},
          function (err, done) {
            if (err)
              return res.status(500).json({
                isSuccess: false,
                msg: 'Server Error',
                response: err,
              });
            else {
              return res.status(200).json({
                isSuccess: true,
                
                msg: 'Profile Image Changed !',
                response: done,
              });
            }
          }
        );
      } else {
        return res.status(400).json({
          isSuccess: false,
          msg: 'No Image Selected',
        });
      }
    
}



const coverImageChange=(req,res)=>{
    if (req.file) {
        var secure_url = process.env.HOST_ADDRESS +"/"+ req.file.path;
        const doctorId=req.params.id;
        //updating the user image to db
        doctorSchema.findOneAndUpdate({doctorId:doctorId},{coverPhotoLink:secure_url},
          function (err, done) {
            if (err)
              return res.status(500).json({
                isSuccess: false,
                msg: 'Server Error',
                response: err,
              });
            else {
              return res.status(200).json({
                isSuccess: true,
                msg: 'Cover Image Changed !',
                response: done,
              });
            }
          }
        );
      } else {
        return res.status(400).json({
          isSuccess: false,
          msg: 'No Image Selected',
        });
      }
}


module.exports={profileImageChange,coverImageChange}