const { doctorSchema } = require("../../database/doctor_schema");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");
const { testSmsSender } = require("../../middleware/smsSender");

const viewAllDoctor = (req, res) => {
  doctorSchema.find({}).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      res.status(200).json({ msg: "All Doctor data fetched", data: done });
    }
  });
};

const viewAllSignupDoctor = (req, res) => {
  doctorSignupSchema.find({}).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      testSmsSender();
      res.status(200).json({ msg: "All Doctor data fetched", data: done });
    }
  });
};

const viewNotApprovedDoctorRequest = (req, res) => {
  doctorSignupSchema.find({"Approped": false }).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    res.status(200).json({ msg: "All doctor request fetched", data: done });
  });
};

const viewApprovedDoctorRequest = (req, res) => {
  doctorSignupSchema.find({"Approped": true }).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    res.status(200).json({ msg: "All doctor request fetched", data: done });
  });
};

module.exports = {
  viewAllDoctor,
  viewAllSignupDoctor,
  viewApprovedDoctorRequest,
  viewNotApprovedDoctorRequest,
};
