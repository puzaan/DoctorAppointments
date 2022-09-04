const express = require("express");
const { createDoctor } = require("../controller/doctor/create");
const {
  viewAllDoctor,
  viewAllSignupDoctor,
  viewApprovedDoctorRequest,
  viewNotApprovedDoctorRequest,
} = require("../controller/doctor/viewAll");
const {
  viewDoctorById,
  viewSignupDoctorById,
} = require("../controller/doctor/viewById");
const {
  updatePassword,
  updateDoctorById,
  addContactNumber,
  removeContactNumber,
  addEducation,
  removeEducation,
  addHospital,
  deleteHospital,
  addVideo,
  deleteVideo,
  addDates,
  deleteDates,
  addContactNumberByAdmin,
  removeContactNumberByAdmin,
  approveDoctor,
} = require("../controller/doctor/update");
const {
  profileImageChange,
  coverImageChange,
} = require("../controller/doctor/ImageChange");
const {
  viewDoctorByNameAndTag,
  addTagById,
  deleteTagById,
} = require("../controller/doctor/doctorByNameAndTag");
const {
  deleteDoctorById,
  deleteSignupDoctorById,
} = require("../controller/doctor/delete");
const doctorRoute = express.Router();
//image settings
const multer = require("multer");
const path = require("path");
//image setup for multer
const { multerSettings } = require("../middleware/multerSettings");
var upload = multer({
  storage: multerSettings.userProfile.myStorage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".pdf"
    ) {
      return callback(new Error("Only images and pdf are allowed"));
    }
    callback(null, true);
  },
});

doctorRoute.post("/create", createDoctor);
doctorRoute.delete("/delete/:id", deleteDoctorById);
//profile Image Change
doctorRoute.post(
  "/add/profile/image/:id",
  upload.single("img"),
  profileImageChange
);
//cover Image Change
doctorRoute.post(
  "/add/cover/image/:id",
  upload.single("img"),
  coverImageChange
);

doctorRoute.get("/view/all", viewAllDoctor);
doctorRoute.get("/view/:id", viewDoctorById);
//doctor search
doctorRoute.get("/view/doctor/:alphabet", viewDoctorByNameAndTag);

//add tag for doctor
doctorRoute.put("/add/tag/:id", addTagById);
doctorRoute.delete("/delete/tag/:id", deleteTagById);

//general data update
doctorRoute.put("/update/:id", updateDoctorById);
//password update
doctorRoute.put("/update/password/:id", updatePassword);
//phone number update
doctorRoute.put("/add/number/:id", addContactNumber);

doctorRoute.delete("/delete/number/:id/:number", removeContactNumber);

//education degree update
doctorRoute.put("/add/education/:id", addEducation);
doctorRoute.delete("/delete/education/:id", removeEducation);
//add affiliated hospitals
doctorRoute.put("/add/hospital/:id", addHospital);
doctorRoute.delete("/delete/hospital/:id", deleteHospital);
//add or remove video
doctorRoute.put("/add/video/:id", addVideo);
doctorRoute.delete("/delete/video/:id", deleteVideo);
//add or remove available dates
doctorRoute.put("/add/dates/:id", addDates);
doctorRoute.delete("/delete/dates/:id", deleteDates);

// Sign up doctor api with token
doctorRoute.delete("/delete/signupdoc/:id", deleteSignupDoctorById);
doctorRoute.get("/view/signupdoc/all", viewAllSignupDoctor);
doctorRoute.get("/view/signupdoc/:id", viewSignupDoctorById);

// // view approved Sign up doctor api with admin or superadmin token
doctorRoute.get("/view/approved/doctor", viewApprovedDoctorRequest);
doctorRoute.get("/view/not/approved/doctor", viewNotApprovedDoctorRequest);
doctorRoute.put("/approve/doctor/:id", approveDoctor);

module.exports = { doctorRoute };
