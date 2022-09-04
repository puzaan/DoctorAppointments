const { doctorSchema } = require("../../database/doctor_schema");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");
const fs = require("fs");

const deleteDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const userdata = await doctorSchema.findOneAndDelete({
      doctorId: doctorId,
    });
    if (userdata) {
      res.status(200).json({ status: "Success", msg: "Admin Deleted" });
    } else {
      res
        .status(400)
        .json({ status: "Fail", msg: "No user Found for Given Id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Fail", msg: "Error in Deleting User" });
  }
};

const deleteSignupDoctorById = async (req, res) => {
  const doctorSinId = await doctorSignupSchema.findOne({
    doctorSinId: req.params.id,
  });
  if (doctorSinId) {
    if (doctorSinId.NmcFiles) {
      let NmcFiles = doctorSinId.NmcFiles.split(process.env.HOST_ADDRESS).pop();
      fs.unlinkSync(`.${NmcFiles}`);
    }
    if (doctorSinId.MBBSFile) {
      let MBBSFile = doctorSinId.MBBSFile.split(process.env.HOST_ADDRESS).pop();
      fs.unlinkSync(`.${MBBSFile}`);
    }
    if (doctorSinId.MdMsFile) {
      let MdMsFile = doctorSinId.MdMsFile.split(process.env.HOST_ADDRESS).pop();
      fs.unlinkSync(`.${MdMsFile}`);
    }
    if (doctorSinId.DmMchFile) {
      let DmMchFile = doctorSinId.DmMchFile.split(
        process.env.HOST_ADDRESS
      ).pop();
      fs.unlinkSync(`.${DmMchFile}`);
    }
    if (doctorSinId.Photo) {
      let Photo = doctorSinId.Photo.split(process.env.HOST_ADDRESS).pop();
      fs.unlinkSync(`.${Photo}`);
    }
    if (doctorSinId.fellowShipFile) {
      for (let i = 0; i < doctorSinId.fellowShipFile.length; i++) {
        fs.unlinkSync(
          `.${doctorSinId.fellowShipFile[i]
            .split(process.env.HOST_ADDRESS)
            .pop()}`
        );
      }
    }

    await doctorSinId.remove();
    res.json({
      msg: "Doctor delete",
    });
  } else {
    res.status(404);
    throw new Error("id not found");
  }
};

module.exports = { deleteDoctorById, deleteSignupDoctorById };
