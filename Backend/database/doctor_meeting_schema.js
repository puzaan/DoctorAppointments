const mongoose = require("mongoose");
const { patientScheema } = require("./patient_schema");
const { prescriptionScheema } = require("./prescription");

const doctorMeetingScheema = new mongoose.Schema(
  {
    meetingId: {
      type: String,
      default: Date.now(),
    },
    pdfLink: { type: String, default: "test1.pdf" },
    meetingLink: String,
    prescription: prescriptionScheema,
    active: { type: Boolean, default: true },
    patientDetail: patientScheema,
    doctorSinId: String,
    createdBy: String,
  },
  { timestamps: true }
);

const doctorMeetingSchema = mongoose.model(
  "doctorMeetingSchema",
  doctorMeetingScheema
);
module.exports = { doctorMeetingSchema };
