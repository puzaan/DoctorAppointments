// const Vonage = require("@vonage/server-sdk");
// const WhatsAppText = require("@vonage/server-sdk/lib/Messages/WhatsAppText");

// const vonage = new Vonage({
//   apiKey: "0e479c4e",
//   apiSecret: "zQKmQG6SOp5LnWPc",
// });

// const vonageWhatsappSender = async () => {
//   await vonage.messages.send(
//     new WhatsAppText(
//       "This is a WhatsApp Message text message sent using the Messages API",
//       "9779803430046",
//       "14157386102"
//     ),
//     (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(data.message_uuid);
//       }
//     }
//   );
// };

// module.exports = {
//   vonageWhatsappSender,
// };
