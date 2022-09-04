const { doctorSchema } = require("../../database/doctor_schema");
const bcrypt = require("bcryptjs");
// const fs = require("fs");
const fs = require("fs");
const { doctorCreateEmailSender } = require("../../middleware/emailSender");
const jwt = require("jsonwebtoken");
const secretkey = require("../../constants/jsonSecretKey");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");
const { imageUrl } = require("../../constants/imageUrl");

const createDoctor = async (req, res) => {
  let { password } = req.body;
  let created_by_admin = req.createdBy;
  let coverPhotoLink =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACGFpr0iqURE_6EHYMm-AGXfhXC1Nzf4ucA&usqp=CAU";
  let profilePhotoLink =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACGFpr0iqURE_6EHYMm-AGXfhXC1Nzf4ucA&usqp=CAU";
  const {
    fullName,
    dob,
    gender,
    address,
    fee,
    contactNumber,
    emailId,
    role,
    speciality,
    educationBackground,
    NMC_number,
    Affiliated_Hospital,
    videoList,
  } = req.body;
  //setting default password
  const savetoken = jwt.sign({ fullName, emailId }, secretkey.secretKey);
  let salt = await bcrypt.genSalt(10);
  if (!password) {
    password = "12345678";
  }
  let hashPassword = bcrypt.hashSync(password, salt);
  doctorSchema.findOne({ emailId: emailId }).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    if (done) {
      res.status(400).json({ msg: "Email Id in use" });
    } else {
      console.log(done);
      doctorSchema.create(
        {
          fullName: fullName,
          token: savetoken,
          password: hashPassword,
          dob: dob,
          gender: gender,
          address: address,
          fee: fee,
          contactNumber: contactNumber,
          emailId: emailId,
          role: role,
          speciality: speciality,
          educationBackground: educationBackground,
          NMC_number: NMC_number,
          Affiliated_Hospital: Affiliated_Hospital,
          created_by_admin: created_by_admin,
          videoList: videoList,
          profilePhotoLink: profilePhotoLink,
          coverPhotoLink: coverPhotoLink,
        },
        async function (error, done) {
          if (error) {
            if (error.name == "ValidationError") {
              console.log(error);
              res
                .status(400)
                .json({ msg: "Please enter valid value for given field" });
              return;
            }
            res.status(400).json({ msg: "Error in creating database" });
          } else {
            doctorCreateEmailSender(req, emailId, password);
            res.status(200).json({ msg: "Database  Created", data: done });
          }
        }
      );
    }
  });
};

const signupDoctor = async (req, res) => {
  const {
    fullName,
    email,
    address,
    contactNumber,
    gender,
    NMC_number,
    MBBS,
    MD_MS,
    MdMsCollege,
    DM_MCH,
    DmMchCollege,
    specialization,
    specializationKey,
    Affilation,
    institution,
    fellowshipName,
  } = req.body;

  let NmcFiles;
  let MBBSFile;
  let Photo;
  let MdMsFile;
  let DmMchFile;
  let fellowShipFile = [];

  if (req.files.nmc) {
    NmcFiles = process.env.HOST_ADDRESS + "/" + req.files.nmc[0].path;
    // console.log(req.files.nmc[0].path);
  } else {
    return res.status(400).json({
      isSuccess: false.valueOf,
      msg: "NMC file required",
    });
  }
  if (req.files.mbbs) {
    MBBSFile = process.env.HOST_ADDRESS + "/" + req.files.mbbs[0].path;
    // for (let i = 0; i < req.files.mbbs.length; i++) {
    //   MBBSFile.push(process.env.HOST_ADDRESS + "/" + req.files.mbbs[i].path);
    // }
    // MBBSFile = process.env.HOST_ADDRESS + "/" + req.files.mbbs[0].path;
  } else {
    return res.status(400).json({
      isSuccess: false.valueOf,
      msg: "MBBS certificate required",
    });
  }

  if (req.files.photo) {
    Photo = process.env.HOST_ADDRESS + "/" + req.files.photo[0].path;
  } else {
    return res.status(400).json({
      isSuccess: false.valueOf,
      msg: "Photo is required",
    });
  }

  if (req.files.md_ms) {
    MdMsFile = process.env.HOST_ADDRESS + "/" + req.files.md_ms[0].path;
  }

  if (req.files.dm_ms) {
    DmMchFile = process.env.HOST_ADDRESS + "/" + req.files.dm_ms[0].path;
  }
  if (req.files.fellowship) {
    for (let i = 0; i < req.files.fellowship.length; i++) {
      fellowShipFile.push(
        process.env.HOST_ADDRESS + "/" + req.files.fellowship[i].path
      );
    }
  }
  const password = "12345678";
  const savetoken = jwt.sign({ fullName, email }, secretkey.secretKey);
  let salt = await bcrypt.genSalt(10);
  let hashPassword = bcrypt.hashSync(password, salt);
  doctorSignupSchema.findOne({ email }).exec((error, done) => {
    if (error) {
      // if (req.files.nmc) {
      //   fs.unlinkSync(req.files.nmc[0].path);
      // }
      // if (req.files.mbbs) {
      //   fs.unlinkSync(req.files.mbbs[0].path);
      // }
      // if (req.files.photo) {
      //   fs.unlinkSync(req.files.photo[0].path);
      // }
      // if (req.files.md_ms) {
      //   fs.unlinkSync(req.files.md_ms[0].path);
      // }
      // if (req.files.fellowship) {
      //   for (let i = 0; i < req.files.fellowship.length; i++) {
      //     fs.unlinkSync(req.files.md_ms[i].path);
      //   }
      // }
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    if (done) {
      if (req.files.nmc) {
        fs.unlinkSync(`./${req.files.nmc[0].path}`);
      }

      if (req.files.mbbs) {
        fs.unlinkSync(`./${req.files.mbbs[0].path}`);
      }
      if (req.files.photo) {
        fs.unlinkSync(`./${req.files.photo[0].path}`);
      }
      if (req.files.md_ms) {
        fs.unlinkSync(`./${req.files.md_ms[0].path}`);
      }
      if (req.files.dm_ms) {
        fs.unlinkSync(`./${req.files.dm_ms[0].path}`);
      }
      if (req.files.fellowship) {
        for (let i = 0; i < req.files.fellowship.length; i++) {
          fs.unlinkSync(`./${req.files.fellowship[i].path}`);
        }
      }

      res.status(400).json({ msg: "Email Id in use" });
    } else {
      doctorSignupSchema.create(
        {
          fullName,
          email,
          address,
          contactNumber,
          gender,
          NMC_number,
          NmcFiles,
          MBBS,
          MBBSFile,
          MD_MS,
          MdMsCollege,
          MdMsFile,
          DM_MCH,
          DmMchCollege,
          DmMchFile,
          Photo,
          specialization,
          specializationKey,
          Affilation,
          institution,
          fellowshipName,
          fellowShipFile,
          password: hashPassword,
          token: savetoken,
        },
        async function (error, done) {
          if (error) {
            if (req.files.nmc) {
              fs.unlinkSync(req.files.nmc[0].path);
            }
            if (req.files.mbbs) {
              fs.unlinkSync(req.files.mbbs[0].path);
            }
            if (req.files.photo) {
              fs.unlinkSync(req.files.photo[0].path);
            }
            if (req.files.md_ms) {
              fs.unlinkSync(req.files.md_ms[0].path);
            }
            if (req.files.dm_ms) {
              fs.unlinkSync(`./${req.files.dm_ms[0].path}`);
            }
            if (req.files.fellowship) {
              for (let i = 0; i < req.files.fellowship.length; i++) {
                fs.unlinkSync(req.files.fellowship[i].path);
              }
            }
            if (error.fullName == "ValidationError") {
              console.log(error);
              res
                .status(400)
                .json({ msg: "Please enter valid value for given field" });
              return;
            }
            res.status(400).json({ msg: "Error in creating database" });
            console.log(error);
          } else {
            res.status(200).json({ msg: "Database Created", data: done });
          }
        }
      );
    }
  });

  // console.log("................... requsted  data ............");
  // console.log(req.files);
  // console.log(req.body);
  // res.status(200).json({ msg: "doctor details" });
};

module.exports = { createDoctor, signupDoctor };
