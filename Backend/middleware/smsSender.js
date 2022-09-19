const accountSid = "AC3f780fafbe583d842e08dd5897789ada";
const authToken = "105825dafb23b36a46ce080a94b2d534";
const client = require("twilio")(accountSid, authToken);

const testSmsSender = async () => {
  client.messages
    .create({
      from: "whatsapp:+19517244696",
      body: "Hello there!",
      to: "whatsapp:+9779803430046",
    })
    .then((message) => console.log(message.sid));
};

module.exports = {testSmsSender};