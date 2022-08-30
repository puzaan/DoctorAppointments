const multer = require("multer");
const path = require("path");
//multer setting
var multerSettings = {
  userProfile: {
    myStorage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./files/doctorProfiles");
      },
      filename: function (req, file, cb) {
        // cb(null, Date.now() + "--" + file.originalname);
        // pull out name feild and rewiite file name
        //`${req.body.fullName}-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`

        cb(
          null,
          `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
      },
    }),
  },
};

module.exports = { multerSettings };
