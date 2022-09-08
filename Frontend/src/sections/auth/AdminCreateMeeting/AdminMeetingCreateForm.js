import * as Yup from "yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// component
import Error from "../../../pages/Error";
import Loder from "../../../pages/Loading";
import { CreateMeeting } from "../../../apigetway/actions/MeetingAction";
// ----------------------------------------------------------------------

AdminMeetingCreateForm.propTypes = {
  data: PropTypes.object,
};
export default function AdminMeetingCreateForm({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const meetingCreate = useSelector((state) => state.meetingCreate);
  const { loading, error, success } = meetingCreate;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    patientName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your name"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Address is required"),
    age: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Please select your gender"),
    occupation: Yup.string().required("Please select your gender"),
    doctorId: Yup.string().required("Please select Doctor Id"),
    timeRequested: Yup.string().required("Please select time"),
    dateRequested: Yup.string().required("Please select date"),
    description: Yup.string().required("Please write some description"),
    patientEmail: Yup.string()
      .trim()
      .email("Please enter a valid email address")
      .required("Please enter your email id"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Enter your contact Number"),
  });

  const formik = useFormik({
    initialValues: {
      patientName: `${data.fullName}`,
      phoneNumber: `${data.contact}`,
      gender: `${data.sex}`,
      address: `${data.address}`,
      age: new Date(data.age).toLocaleDateString("en-US"),
      description: `${data.message}`,
      dateRequested: new Date(data.bookingdate).toLocaleDateString("en-US"),
      timeRequested: `${data.timeslot}`,
      doctorId: `${data.doctorSinId}`,
      patientEmail: `${data.email}`,
      occupation: `${data.occupation}`,
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(
        CreateMeeting(
          formik.values.patientName,
          formik.values.phoneNumber,
          formik.values.gender,
          formik.values.address,
          formik.values.age,
          formik.values.description,
          formik.values.dateRequested,
          formik.values.timeRequested,
          formik.values.doctorId,
          formik.values.patientEmail,
          formik.values.occupation
        )
      );
    },
  });

  useEffect(() => {
    if (success) {
      navigate("/admin/booking", { replace: true });
    }
  }, [dispatch, navigate, success]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {error && <Error> {error} </Error>}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Patient Name"
                {...getFieldProps("patientName")}
                error={Boolean(touched.patientName && errors.patientName)}
                helperText={touched.patientName && errors.patientName}
              />
              <TextField
                label="Gender"
                variant="outlined"
                name={"gender"}
                fullWidth
                {...getFieldProps("gender")}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Patient Email"
                {...getFieldProps("patientEmail")}
                error={Boolean(touched.patientEmail && errors.patientEmail)}
                helperText={touched.patientEmail && errors.patientEmail}
              />
              <TextField
                label="Occupation"
                variant="outlined"
                fullWidth
                {...getFieldProps("occupation")}
                error={Boolean(touched.occupation && errors.occupation)}
                helperText={touched.occupation && errors.occupation}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Address"
                {...getFieldProps("address")}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
              <TextField
                fullWidth
                label="Date of Birth"
                {...getFieldProps("age")}
                error={Boolean(touched.age && errors.age)}
                helperText={touched.age && errors.age}
              />
              <TextField
                fullWidth
                label="Mobie Number"
                {...getFieldProps("phoneNumber")}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Date"
                {...getFieldProps("dateRequested")}
                error={Boolean(touched.dateRequested && errors.dateRequested)}
                helperText={touched.dateRequested && errors.dateRequested}
              />
              <TextField
                fullWidth
                label="Time"
                {...getFieldProps("timeRequested")}
                error={Boolean(touched.timeRequested && errors.timeRequested)}
                helperText={touched.timeRequested && errors.timeRequested}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Doctor Id"
                {...getFieldProps("doctorId")}
                error={Boolean(touched.doctorId && errors.doctorId)}
                helperText={touched.doctorId && errors.doctorId}
              />
            </Stack>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              {...getFieldProps("description")}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
            {loading && <Loder />}
            <LoadingButton size="mideum" type="submit" variant="contained">
              Create
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </LocalizationProvider>
  );
}
