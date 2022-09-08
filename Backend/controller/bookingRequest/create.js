// const { bookingSchema } = require("../../database/booking_schema");
const { doctorSignupSchema } = require("../../database/doctor_signup_schema");

const createBooking = (req, res) => {
  const {
    fullName,
    age,
    sex,
    contact,
    email,
    address,
    message,
    doctorSinId,
    date,
    occupation,
    timeslot,
  } = req.body;
  doctorSignupSchema
    .findOne({ doctorSinId: doctorSinId })
    .exec((error, done) => {
      if (error) {
        res.status(500).json({ msg: "Internal Server Error" });
        return;
      }
      if (done) {
        console.log(occupation);
        doctorSignupSchema.create(
          {
            fullName: fullName,
            occupation: occupation,
            message: message,
            age: age,
            sex: sex,
            contact: contact,
            email: email,
            address: address,
            doctorSinId: doctorSinId,
            bookingdate: date,
            timeslot: timeslot,
          },
          function (error, done) {
            console.log(error);
            if (error) {
              res.status(500).json({ msg: "Internal Server Error" });
              return;
            }
            if (done) {
              res
                .status(200)
                .json({ msg: "Booking Request Added!!", data: done });
            }
          }
        );
      } else {
        res.status(400).json({ msg: "No data found for given doctor Id" });
      }
    });
};

module.exports = { createBooking };
