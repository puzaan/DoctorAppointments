import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// component
import { AdminCreateDoctor } from "../../../apigetway/actions/DoctorAction";
import { DOCTOR_CREATE_RESET } from "../../../apigetway/constants/DoctorConstants";
import Error from "../../../pages/Error";
import Loder from "../../../pages/Loading";
// ----------------------------------------------------------------------

export default function AdminDoctorCreateForm() {
  const navigate = useNavigate();
  const [dob, setdob] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();
  const doctorCreate = useSelector((state) => state.doctorCreate);
  const { loading, error, success } = doctorCreate;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your name"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Address is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    age: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Please select your gender"),
    fee: Yup.number()
      .min(1, "Fee cannot bo less than Zero")
      .required("Please Enter price"),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Enter your contact Number"),
    NMC_number: Yup.string()
      .matches(phoneRegExp, "NMC number is not valid")
      .required("Enter your NMC Number"),
    speciality: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your name"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      contactNumber: "",
      gender: "",
      address: "",
      age: new Date()
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      speciality: "",
      NMC_number: "",
      fee: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(
        AdminCreateDoctor(
          formik.values.fullName,
          formik.values.email,
          formik.values.password,
          formik.values.contactNumber,
          formik.values.gender,
          formik.values.address,
          dob,
          formik.values.speciality,
          formik.values.NMC_number,
          formik.values.fee
        )
      );
    },
  });
  useEffect(() => {
    setdob(new Date(formik.values.age).toLocaleDateString());
  }, [formik.values.age]);
  useEffect(() => {
    if (success) {
      dispatch({ type: DOCTOR_CREATE_RESET });
      navigate("/admin/doctor", { replace: true });
    }
    console.log(success);
  }, [dispatch, navigate, success]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormikProvider value={formik}>
        {error && <Error>{error.msg}</Error>}
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Full Name"
                {...getFieldProps("fullName")}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />

              <TextField
                select
                label="Select gender"
                variant="outlined"
                name={"gender"}
                fullWidth
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                {["Male", "Female", "Other"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                label="Mobie Number"
                {...getFieldProps("contactNumber")}
                error={Boolean(touched.contactNumber && errors.contactNumber)}
                helperText={touched.contactNumber && errors.contactNumber}
              />
            </Stack>

            <MobileDatePicker
              fullWidth
              disableFuture
              label="Select age"
              value={formik.values.age}
              onChange={(newValue) => {
                formik.setFieldValue("age", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              fullWidth
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="NMC_number"
                {...getFieldProps("NMC_number")}
                error={Boolean(touched.NMC_number && errors.NMC_number)}
                helperText={touched.NMC_number && errors.NMC_number}
              />
              <TextField
                fullWidth
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                type="number"
                fullWidth
                label="Fee"
                {...getFieldProps("fee")}
                error={Boolean(touched.fee && errors.fee)}
                helperText={touched.fee && errors.fee}
              />
              <TextField
                fullWidth
                label="Speciality"
                {...getFieldProps("speciality")}
                error={Boolean(touched.speciality && errors.speciality)}
                helperText={touched.speciality && errors.speciality}
              />
            </Stack>
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
