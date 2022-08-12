const express = require("express");
const app = express();
const morgan = require("morgan");
const mongodb = require("mongoose");
const http=require("http");
const path = require('path');
const databaseurl = require("./database/databaseUrl");
const fs= require('fs');
const { PdfReader } = require("pdfreader");

const { notfound } = require("./error/notfound");
const port = process.env.PORT || 5050;

const { apiKeyCheck } = require("./middleware/apikey_check");
const { adminRoute } = require("./router/adminRouter");
const { doctorRoute } = require("./router/doctorRouter");
const { verifySuperAdmin } = require("./middleware/superAdmin");
const { adminAuthRoute } = require("./router/adminAuthRoute");
const { adminVerification,adminDoctorVerification } = require("./middleware/adminVerification");
const { doctorAuthRoute } = require("./router/doctorAuthRoute");
const { bookingRoute } = require("./router/bookingRoute");
const { meetingRouter } = require("./router/meetingRoute");
const { doctorPublicRoute } = require("./router/doctorPublicRoute");

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'middleware')));
app.use("/files",express.static(path.join(__dirname, 'files')));

///video call system using socket.io
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


//security app
const helmet = require("helmet");
const cors = require("cors");
const xssclean = require("xss-clean");
const expressRate = require("express-rate-limit");
const { fstat } = require("fs");
const rate = expressRate({
  windowMs: 15 * 60 * 1000,
  max: 50
})

app.use(helmet());
app.use(cors());
app.use(xssclean());
app.use(rate);

app.use(morgan("tiny"));
// app.use(express.static(path.join(__dirname, 'middleware\pdfgenerator\prescriptionFile')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use("/pdf",express.static('middleware')); // internal ususage



app.get("/", (req, res) => {
  res.send("APP For Doctors API");
})
//creating super admin
app.use("/api/v1/super/admin/login", verifySuperAdmin);
app.use("/api/v1/admin", adminVerification, adminRoute);
//admin login and forgot password
app.use("/api/v1/auth/admin", adminAuthRoute);
//either send super user api_key or send admin token value on header(api_key)
app.use("/api/v1/doctor", adminDoctorVerification, doctorRoute);
//for public without verification
app.use("/api/v1/public/doctor", doctorPublicRoute);
//doctor login and forgot password system
app.use("/api/v1/auth/doctor", doctorAuthRoute);
//Doctor Booking api
app.use("/api/v1/booking", bookingRoute);
//metting api
app.use("/api/v1/meeting", meetingRouter);


app.use(notfound);

//io connection code for video call
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});






mongodb.connect(databaseurl.databaseurl).then(() => {
  console.log("Connection Successful to database");
  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  })
}).catch((e) => {
  console.log(e);
});







