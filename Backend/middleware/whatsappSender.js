// const accountSid = "AC3f780fafbe583d842e08dd5897789ada";
// const authToken = "7fb3e3ddb66c82fb6e0131ce768ed540";
// const client = require("twilio")(accountSid, authToken);

// const whatsappSender = async (
//   req,
//   link,
//   dateRequested,
//   timeRequested,
//   patientName,
//   docName,
//   patientNumber,
// ) => {
//   let dateTimestamp = new Date(dateRequested);
//   let dateofAppointment = dateTimestamp.toLocaleDateString("en-US");
//   await client.messages
//     .create({
//       body:
//         "Dear: " +
//         patientName +
//         "\n\n" +
//         "As per your request, you consultation with Dr. " +
//         docName +
//         "has been scheduled" +
//         "\n\n" +
//         "Meeting Date:   " +
//         dateofAppointment +
//         "\n\n" +
//         "Time:   " +
//         timeRequested +
//         "\n\n" +
//         "Please follow the link to go to your meeting:\n\n" +
//         "Meeting Link:   " +
//         link +
//         "\n\n" +
//         "If you did not request this meeting, please ignore this email.\n" +
//         "\n\n\n" +
//         "Thank you," +
//         "\n" +
//         "xyba Health Technologies",
//       from: "whatsapp:+14155238886",
//       to: "whatsapp:+9779803430046",
//     })
//     .then((message) => console.log(message.sid))
//     .done();
// };

// module.exports = {
//   whatsappSender,
// };
