const { doctorSchema } = require("../../database/doctor_schema");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");

const viewDoctorByNameAndTag = async (req, res) => {
  //let data=await publicFigureSchema.find({name:{$regex:regex}}).select("pfid name dob description category rating likes dislikes gender profileUrl coverUrl").sort();
  let sortAlphabate = req.params.alphabet;
  const regex = new RegExp("^" + sortAlphabate);
  console.log(regex);
  try {
    const done = await doctorSchema.find({
      fullName: { $regex: regex, $options: "i" },
    });
    const done1 = await doctorSchema.find({
      tag: { $regex: regex, $options: "i" },
    });
    done.push(done1);
    if (done.length > 0) {
      res.status(200).json({ msg: "Searched Data fetched", data: done });
    } else {
      res.status(400).json({ msg: "No Data found", data: done });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server  Error" });
    return;
  }
};
const addTagById = (req, res) => {
  const value = req.body.value;
  doctorSchema.findOne({ doctorId: req.params.id }).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      if (!done) {
        res.status(400).json({ msg: "No data found for given Id" });
      } else {
        doctorSchema
          .findOneAndUpdate(
            { doctorId: req.params.id },
            { $push: { tag: value } }
          )
          .exec((error, done) => {
            if (done) {
              res.status(200).json({ msg: "Doctor data fetched", data: done });
            } else {
              res.status(500).json({ msg: "Internal Server Error" });
            }
          });
      }
    }
  });
};
const deleteTagById = (req, res) => {
  const value = req.body.value;
  doctorSchema.findOne({ doctorId: req.params.id }).exec((error, done) => {
    if (error) {
      res.status(500).json({ msg: "Server Error" });
    } else {
      if (!done) {
        res.status(400).json({ msg: "No data found for given Id" });
      } else {
        doctorSchema
          .findOneAndUpdate(
            { doctorId: req.params.id },
            { $pull: { tag: value } }
          )
          .exec((error, done) => {
            if (done) {
              res.status(200).json({ msg: "Doctor Tag deleted", data: done });
            } else {
              res.status(500).json({ msg: "Internal Server Error" });
            }
          });
      }
    }
  });
};
const viewAvailableDates = (req, res) => {
  doctorSignupSchema
    .findOne({ doctorSinId: req.params.id })
    .exec((error, done) => {
      if (error) {
        res.status(500).json({ msg: "Server Error" });
      } else {
        if (!done) {
          res.status(400).json({ msg: "No data found for given Id" });
        } else {
          res.status(200).json({
            msg: "Available Dates are as follow",
            data: done.available_dates,
            doctorId: done.doctorId,
          });
        }
      }
    });
};

const viewAvailableTime = (req, res) => {
  const myDate = req.query.date;
  const availableTime = [];
  const ourDate = myDate.split("/");
  const ourday = parseInt(ourDate[0]);
  const ourMonth = parseInt(ourDate[1]);
  const ourYear = parseInt(ourDate[2]);
  doctorSchema
    .findOne({ doctorId: req.params.id })
    .exec(async (error, done) => {
      if (error) {
        res.status(500).json({ msg: "Server Error" });
      } else {
        if (!done) {
          res.status(400).json({ msg: "No data found for given Id" });
        } else {
          const availableDates = done.available_dates;
          await availableDates.forEach((element) => {
            const date = element.date;
            console.log(date);
            //let timeExtract=new Date(date*1000);
            let timeExtract = new Date(date * 1000).toLocaleString("US-en");

            const year = parseInt(timeExtract.split("/")[2]);
            const month = parseInt(timeExtract.split("/")[1]);
            const day = parseInt(timeExtract.split("/")[0]);
            //    const time=timeExtract.getTime();

            if (year == ourYear && month == ourMonth && day == ourday) {
              availableTime.push(element.date);
            }
            console.log(year, month, day, ourYear, ourMonth, ourday);
          });
          res
            .status(200)
            .json({ msg: "Available time data fetched", data: availableTime });
        }
      }
    });
};

const viewDoctorAvailableTime = (req, res) => {
  const myDate = req.query.date;
  const availableTime = [];
  const ourDate = myDate.split("/");
  const ourday = parseInt(ourDate[0]);
  const ourMonth = parseInt(ourDate[1]);
  const ourYear = parseInt(ourDate[2]);
  doctorSignupSchema
    .findOne({ doctorSinId: req.params.id })
    .exec(async (error, done) => {
      if (error) {
        res.status(500).json({ msg: "Server Error" });
      } else {
        if (!done) {
          console.log(done);
          res.status(400).json({ msg: "No data found for given Id" });
        } else {
          const availableDates = done.available_dates;
          await availableDates.forEach((element) => {
            const date = element.date;
            console.log(date);
            //let timeExtract=new Date(date*1000);
            let timeExtract = new Date(date * 1000).toLocaleString("US-en");

            const year = parseInt(timeExtract.split("/")[2]);
            const month = parseInt(timeExtract.split("/")[1]);
            const day = parseInt(timeExtract.split("/")[0]);
            //    const time=timeExtract.getTime();

            if (year == ourYear && month == ourMonth && day == ourday) {
              availableTime.push(element.date);
            }
            console.log(year, month, day, ourYear, ourMonth, ourday);
          });
          res
            .status(200)
            .json({ msg: "Available time data fetched", data: availableTime });
        }
      }
    });
};

module.exports = {
  viewAvailableTime,
  viewAvailableDates,
  viewDoctorByNameAndTag,
  addTagById,
  deleteTagById,
  viewDoctorAvailableTime,
};
