const multer=require("multer");
//multer setting
var multerSettings = {
    userProfile: {
      myStorage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './files/doctorProfiles');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '--' + file.originalname);
        },
      }),
    },
  }

  module.exports={multerSettings};