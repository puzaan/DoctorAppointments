/*eslint-disable */
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import './Form.css';
import axios from "axios";
import url from "../../apigetway/mainUrl";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Please enter a valid name")
    .max(50, "Please enter a valid name")
    .required("Please specify your Full name"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please enter your email id"),
  contact: yup
    .string()
    .trim()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/,
      "Please enter a valid contact number."
    )
    .required("Please enter your phone"),
  sex: yup.string().required("Please specify your gender"),
  occupation: yup.string().required("Please specify your Occupation"),
  timeslot: yup.string().required("Please select a time"),
  doctorSinId: yup.string().required("Please select a doctor"),
  age: yup.date().required("Please select a date and time").nullable(),
  message: yup
    .string()
    .trim()
    .max(500, "The message cannot contain more than 500 characters")
    .required("Please specify Your problems"),
});
const Input = styled("input")({
  display: "none",
});

const Form = (props) => {
  const { data } = props;

  const [fulldate, setFulldate] = useState("");
  const [timeList, setTimeList] = useState([]);
  const [fulltime, setFullTime] = useState("");
  const [multipleFile, setMultipleFile] = useState([]);
  // console.log(multipleFile);

  const [open, setOpen] = useState(false);

  const initialValues = {
    fullName: "",
    age: new Date().toLocaleDateString(),
    address: "",
    email: "",
    contact: "",
    sex: "",
    message: "",
    doctorSinId: "",
    date: null,
    timeslot: "",
    calDate: "",
    occupation: "",
  };

  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const onSubmit = async (values) => {
    const response = await axios
      .post(`${url}/api/v1/booking/create`, {
        fullName: values.fullName,
        age: values.age,
        contact: values.contact,
        email: values.email,
        address: values.address,
        doctorSinId: values.doctorSinId,
        date: fulldate,
        timeslot: fulltime,
        message: values.message,
        occupation: values.occupation,
        sex: values.sex,
      })
      .catch((err) => {
        if (err && err.response.message) {
          alert(err.message);
        }
      });

    if (response && response.data) {
      setOpen(true);
      // console.log(response.data);
    }
  };
  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFulldate(new Date(formik.values.date).toLocaleDateString("en-US"));
  }, [formik.values.date]);

  useEffect(() => {
    // setFullTime(new Intl.DateTimeFormat('en-US', options).format(formik.values.timeslot));
    setFullTime(
      new Date(formik.values.timeslot * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [formik.values.timeslot]);

  useEffect(() => {
    const getTimelist = async () => {
      await fetch(
        `${url}/api/v1/public/doctor/view/time/${formik.values.doctorSinId}?date=${fulldate}`
      )
        .then((Response) => Response.json())
        .then((receivedData) => setTimeList(receivedData.data));
    };
    getTimelist();
  }, [formik.values.doctorSinId, fulldate]);
  // const multipleFileChange = (e) => {
  //   setMultipleFile(e.target.files);
  // };
  console.log(formik.values.doctorSinId);

  return (
    <Box>
      <Typography variant={"h3"} sx={{ marginBottom: 2 }} align={"center"}>
        Online consultation form
      </Typography>
      <Box
        component={Card}
        variant={"outlined"}
        padding={2}
        bgcolor={"transparent"}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            component={Grid}
            marginBottom={{ xs: 10, sm: 0 }}
            container
            spacing={4}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Full Name
              </Typography>
              <TextField
                label="Full name"
                variant="outlined"
                name={"fullName"}
                fullWidth
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Select Gender
              </Typography>
              <TextField
                select
                label="Select gender"
                variant="outlined"
                name={"sex"}
                fullWidth
                value={formik.values.sex}
                onChange={formik.handleChange}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
                helperText={formik.touched.sex && formik.errors.sex}
              >
                {["Male", "Female", "Other"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Select DOB
              </Typography>
              <MobileDatePicker
                disableFuture
                label="Select DOB"
                value={formik.values.age}
                onChange={(newValue) => {
                  formik.setFieldValue("age", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Phone number
              </Typography>
              <TextField
                label="contact number"
                variant="outlined"
                name={"contact"}
                fullWidth
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Address (optional)
              </Typography>
              <TextField
                label="Address"
                variant="outlined"
                name={"address"}
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                // error={formik.touched.address && Boolean(formik.errors.address)}
                // helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Email Address
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                name={"email"}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Occupation
              </Typography>
              <TextField
                label="Occupation"
                variant="outlined"
                name={"occupation"}
                fullWidth
                value={formik.values.occupation}
                onChange={formik.handleChange}
                error={
                  formik.touched.occupation && Boolean(formik.errors.occupation)
                }
                helperText={
                  formik.touched.occupation && formik.errors.occupation
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Select Doctor
              </Typography>
              <TextField
                select
                label="Select doctor"
                variant="outlined"
                name={"doctorSinId"}
                fullWidth
                value={formik.values.doctorSinId}
                onChange={formik.handleChange}
                error={
                  formik.touched.doctorSinId &&
                  Boolean(formik.errors.doctorSinId)
                }
                helperText={
                  formik.touched.doctorSinId && formik.errors.doctorSinId
                }
              >
                {data.map((option) => (
                  <MenuItem key={option.doctorSinId} value={option.doctorSinId}>
                    {option.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Select Date
              </Typography>
              <MobileDatePicker
                disabled={!formik.values.doctorSinId}
                disablePast
                label="Select Date"
                value={formik.values.date}
                onChange={(newValue) => {
                  formik.setFieldValue("date", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            {timeList.length === 0 ? (
              <Grid item xs={12} sm={3}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Avilable Time
                </Typography>
                <TextField
                  // disabled={formik.values.date === null ? true : false}
                  disabled={!formik.values.date}
                  select
                  label="Time"
                  variant="outlined"
                  name={"timeslot"}
                  fullWidth
                  value={formik.values.timeslot}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.timeslot && Boolean(formik.errors.timeslot)
                  }
                  helperText={formik.touched.timeslot && formik.errors.timeslot}
                  // className="time_tab"
                >
                  <MenuItem>
                    no time schedule is avilable for selected date
                    <br />
                    Please select another date
                  </MenuItem>
                </TextField>
              </Grid>
            ) : (
              <Grid item xs={12} sm={3}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Avilable Time
                </Typography>
                <TextField
                  // disabled={formik.values.date == null ? true : false}
                  disabled={!formik.values.date}
                  select
                  label="Time"
                  variant="outlined"
                  name={"timeslot"}
                  fullWidth
                  value={formik.values.timeslot}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.timeslot && Boolean(formik.errors.timeslot)
                  }
                  helperText={formik.touched.timeslot && formik.errors.timeslot}
                  className="time_tab"
                >
                  {timeList.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {/* {new Date(option * 1000).toLocaleTimeString('en-US')} */}
                      {new Date(option * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            {/* <Grid item xs={6} sm={3}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Mediacl Reports
              </Typography>
              <label htmlFor="contained-button-file">
                <Input id="contained-button-file" multiple type="file" 
                // onChange={(e) => multipleFileChange(e)} 
                />
                <Button variant="contained" component="span">
                  Choose File
                </Button>
              </label>
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                Message
              </Typography>
              <TextField
                label="Message"
                variant="outlined"
                name={"message"}
                fullWidth
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Button size={"large"} variant={"contained"} type={"submit"}>
                Book Appointment
              </Button>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Your Appointment is booked"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    We will inform you for more detail
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Box component="a" href="/">
                    <Button onClick={handleClose} autoFocus>
                      Ok
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
              <Typography
                variant={"subtitle2"}
                color={"textSecondary"}
                sx={{ marginTop: 2 }}
                align={"center"}
              >
                After confirming, we will soon notify you.
              </Typography>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Form;

Form.propTypes = {
  data: PropTypes.array.isRequired,
};
