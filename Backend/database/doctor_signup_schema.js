const mongoose = require("mongoose");

const doctorSignupScheema = new mongoose.Schema({
  "doctorSinId": {
    type: String,
    default: Date.now,
    unique: true,
  },
  "fullName": String,
  "email": String,
  "address": String,
  "contactNumber": String,
  "gender": String,
  "NMC_number": String,
  "NmcFiles": String,
  "MBBS": String,
  "MBBSFile": String,
  "MD_MS": String,
  "MdMsCollege": String,
  "MdMsFile": String,
  "DM_MCH": String,
  "DmMchCollege": String,
  "DmMchFile": String,
  "Photo": String,
  "specialization": String,
  "fellowshipName": [],
  "institution": [],
  "specializationKey": [],
  "fellowShipFile": [],
  "Affilation": [],
  "Approped": {
    type: Boolean,
    default: false,
  },
  "password": String,
  "AppropedBy": String,
});
const doctorSignupSchema = mongoose.model(
  "doctorSignupSchema",
  doctorSignupScheema
);
module.exports = { doctorSignupSchema };
