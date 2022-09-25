const { meetingSchemas } = require("../../database/meeting_schema");
const {
  prescriptionSchema,
  prescriptionObject,
} = require("../../database/prescription");
const {
  patientScheema,
  patientObject,
} = require("../../database/patient_schema");
const {
  generatePdfFunction,
} = require("../../middleware/pdfgenerator/pdfGenerator");
const { jitsiVideoLink } = require("../../constants/videolink");
const {
  sendPdfEmailSender,
  sendMeetingLink,
} = require("../../middleware/emailSender");
const fs = require("fs");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");
const { doctorMeetingSchema } = require("../../database/doctor_meeting_schema");

const createMeeting = (req, res) => {
  const {
    patientName,
    age,
    gender,
    patientEmail,
    occupation,
    message,
    address,
    phoneNumber,
    dateRequested,
    timeRequested,
    doctorId,
  } = req.body;
  const prescript = new prescriptionObject(
    "complaints",
    "observation",
    "advise",
    "treatment"
  );
  const patient = new patientObject(
    patientName,
    patientEmail,
    age,
    gender,
    occupation,
    message,
    address,
    phoneNumber,
    dateRequested,
    timeRequested
  );

  //checking if doctor id is found
  doctorSignupSchema.findOne({ doctorSinId: doctorId }).exec((error, done) => {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    if (done) {
      //creating meeting link
      var dateTimeForMeeting = Date.now();
      var name = patientName.replace(/\s+/g, "");
      const docName = done.fullName;
      const meetingLink =
        jitsiVideoLink + "/" + doctorId + "/" + name + dateTimeForMeeting;

      //if doctor id is found
      doctorMeetingSchema.create(
        {
          meetingLink: meetingLink,
          prescription: prescript,
          patientDetail: patient,
          doctorSinId: doctorId,
          createdBy: req.doctorData.fullName,
        },
        function (error, done) {
          if (error) {
            console.log("while creating meeting error: " + error);
            res.status(500).json({ msg: "Internal Server Error" });
            return;
          }
          if (done) {
            sendMeetingLink(
              req,
              patientEmail,
              meetingLink,
              dateRequested,
              timeRequested,
              patientName,
              docName
            );
            res.status(200).json({ msg: "meeting created", data: done });
          }
        }
      );
    } else {
      res.status(400).json({ msg: "No doctor Found for given doctor Id" });
    }
  });
  //this is demo for creating prescription object
};

const updatePrescription = (req, res) => {
  //after prescription is updated active status goes to false
  const meetingId = req.params.id;
  const { complaints, observation, advise, treatment } = req.body;
  const prescript = new prescriptionObject(
    complaints,
    observation,
    advise,
    treatment
  );
  doctorMeetingSchema
    .findOneAndUpdate(
      { meetingId: meetingId },
      { prescription: prescript, active: false }
    )
    .exec((error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done) {
        res.status(200).json({ msg: "Prescription Updated", data: done });
      } else {
        res
          .status(400)
          .json({ msg: "Invalid Meeting Id or Metting Id not found" });
      }
    });
};

const viewAllMeeting = (req, res) => {
  doctorMeetingSchema.find({}).exec((error, done) => {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    res.status(200).json({ msg: "All Meeting Data Fetched", data: done });
  });
};
const viewActiveMeetingForGivenDoctorId = (req, res) => {
  const doctorId = req.params.id;
  doctorMeetingSchema
    .find({ doctorSinId: doctorId, active: true })
    .exec((error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done.length > 0) {
        res
          .status(200)
          .json({ msg: "Data fetched for given doctor id", data: done });
      } else {
        doctorSignupSchema
          .findOne({ doctorSinId: doctorId })
          .exec((error, done) => {
            if (done) {
              console.log(done);
              res
                .status(400)
                .json({ msg: "No data found for given doctor id" });
            } else {
              res.status(400).json({ msg: "No doctor id found" });
            }
          });
      }
    });
};

//view meeting by doctor id
const viewForGivenDoctorId = (req, res) => {
  const doctorId = req.params.id;
  doctorMeetingSchema
    .find({ doctorSinId: doctorId })
    .sort({ _id: -1 })
    .exec(async (error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done.length > 0) {
        let arrayOfData = [];
        done.forEach((data) => {
          let element = {};
          element.meetingId = data["meetingId"];
          element.active = data["active"];
          element.patientName = data["patientDetail"]["patientName"];
          element.age = data["patientDetail"]["age"];
          element.gender = data["patientDetail"]["gender"];
          element.address = data["patientDetail"]["address"];
          element.phoneNumber = data["patientDetail"]["phoneNumber"];
          element.timeRequest = data["patientDetail"]["timeRequested"];
          element.dataRequest = data["patientDetail"]["dateRequested"];
          arrayOfData.push(element);
        });

        res
          .status(200)
          .json({ msg: "Data fetched for given doctor id", data: arrayOfData });
      } else {
        doctorSignupSchema
          .findOne({ doctorSinId: doctorId })
          .exec((error, done1) => {
            if (done1) {
              res.status(200).json({
                msg: "No meeting data found for given doctor id",
                data: [],
              });
            } else {
              res.status(400).json({ msg: "No doctor id found" });
            }
          });
      }
    });
};

const sendPdfToClient = (req, res) => {
  const meetingId = req.params.id;
  doctorMeetingSchema
    .findOne({ meetingId: meetingId })
    .exec(async (error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done) {
        const tempDoctor = await doctorSignupSchema.findOne({
          doctorSinId: done.doctorSinId,
        });
        const fileAddress = generatePdfFunction(
          req.params.id,
          tempDoctor["fullName"],
          tempDoctor["MBBS"],
          tempDoctor["NMC_number"],
          done["patientDetail"],
          done["prescription"]
        );
        //send sms code goes here with file address;
        let fileAddressInHost =
          process.env.HOST_ADDRESS + process.env.IMAGE_ADDRESS + meetingId;
        sendPdfEmailSender(
          req,
          done["patientDetail"]["patientEmail"],
          fileAddressInHost
        );
        await doctorMeetingSchema.findOneAndUpdate(
          { meetingId: meetingId },
          { pdfLink: fileAddressInHost }
        );
        console.log(fileAddress);

        res
          .status(200)
          .json({ msg: "Pdf link sms sent to the client", data: done });
      } else {
        res.status(400).json({ msg: "No data found for given meeting id" });
      }
    });
};
const viewForGivenMeetingId = (req, res) => {
  const meetingId = req.params.id;
  doctorMeetingSchema
    .findOne({ meetingId: meetingId })
    .exec(async (error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done) {
        res.status(200).json(done);
      } else {
        res.status(400).json({ msg: "No data found for given meeting id" });
      }
    });
};

const viewPdfToClient = (req, res) => {
  const meetingId = req.params.id;

  doctorMeetingSchema
    .findOne({ meetingId: meetingId })
    .exec(async (error, done) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done) {
        const pdfFile = fs.readFileSync(
          "./middleware/pdfgenerator/prescriptionFile/" + meetingId + ".pdf"
        );
        res.contentType("application/pdf");
        res.send(pdfFile);
      } else {
        res.status(400).json({ msg: "No data found for given meeting id" });
      }
    });
};

const deleteMeeting = async (req, res) => {
  const meetingId = req.params.id;
  try {
    const meetingData = await doctorMeetingSchema.findOneAndDelete({
      meetingId: meetingId,
    });
    if (meetingData) {
      res.status(200).json({ status: "Success", msg: "meeting Deleted" });
    } else {
      res
        .status(400)
        .json({ status: "Fail", msg: "No user Found for Given Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Fail", msg: "Error in Deleting meeting" });
  }
};

// const createMeeting = async (req)

module.exports = {
  createMeeting,
  updatePrescription,
  viewAllMeeting,
  viewForGivenDoctorId,
  viewActiveMeetingForGivenDoctorId,
  viewForGivenMeetingId,
  sendPdfToClient,
  viewPdfToClient,
  deleteMeeting,
};
