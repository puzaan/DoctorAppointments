const express = require("express");
const doctorPublicRoute = express.Router();
const { viewAllDoctor, viewAllSignupDoctor, viewApprovedDoctorRequest } = require("../controller/doctor/viewAll");
const {
  viewDoctorByNameAndTag,
  addTagById,
  deleteTagById,
  viewAvailableDates,
  viewAvailableTime,
  viewDoctorAvailableTime,
} = require("../controller/doctor/doctorByNameAndTag");
const { signupDoctor } = require("../controller/doctor/create");
const multer = require("multer");
const { multerSettings, mbbs } = require("../middleware/multerSettings");
const path = require("path");
const { deleteSignupDoctorById } = require("../controller/doctor/delete");
const { ChangePassword } = require("../controller/doctor/update");

var upload = multer({
  storage: multerSettings.userProfile.myStorage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".pdf" &&
      ext !== ".docx"
    ) {
      return callback(new Error("Only images and pdf are allowed"));
    }
    callback(null, true);
  },
});

doctorPublicRoute.get("/view/all", viewAllDoctor);
doctorPublicRoute.get("/view/doctor/:alphabet", viewDoctorByNameAndTag);
doctorPublicRoute.get("/view/dates/:id", viewAvailableDates);
doctorPublicRoute.get("/view/timestamp/:id", viewAvailableTime);
doctorPublicRoute.post(
  "/signup",
  upload.fields([
    { name: "nmc" },
    { name: "mbbs" },
    { name: "md_ms" },
    { name: "dm_ms" },
    { name: "fellowship" },
    { name: "photo" },
  ]),
  signupDoctor
);
doctorPublicRoute.get("/view/signupdoc/all", viewAllSignupDoctor);
doctorPublicRoute.delete("/signupdoc/delete/:id", deleteSignupDoctorById);
doctorPublicRoute.put("/firstchange/password", ChangePassword);
doctorPublicRoute.get("/view/approved/doctor", viewApprovedDoctorRequest);
doctorPublicRoute.get("/view/time/:id", viewDoctorAvailableTime);


module.exports = { doctorPublicRoute };
