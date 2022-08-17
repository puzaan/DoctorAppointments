import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, MenuItem, AlertTitle, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
// component
import { ADMIN_CREATE_RESET } from "../../../apigetway/constants/AdminConstants";
import { CreateAdmin } from "../../../apigetway/actions/AdminAction";

// ----------------------------------------------------------------------

export default function AdminCreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dob, setdob] = useState(new Date().toLocaleDateString());

  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, success, error } = adminCreate;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // const imageUrl =
  //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your name"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Address is required"),
    emailId: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    age: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Please select your gender"),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Enter your contact Number"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      emailId: "",
      password: "",
      contactNumber: "",
      gender: "",
      address: "",
      age: new Date()
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(
        CreateAdmin(
          formik.values.fullName,
          dob,
          formik.values.gender,
          formik.values.address,
          formik.values.contactNumber,
          formik.values.emailId,
          formik.values.password
        )
      );
    },
  });
  useEffect(() => {
    setdob(new Date(formik.values.age).toLocaleDateString());
  }, [formik.values.age]);

  useEffect(() => {
    if (success) {
      dispatch({ type: ADMIN_CREATE_RESET });
      navigate("/superadmin/admin/list", { replace: true });
    }
    console.log(success);
  }, [success, dispatch, navigate]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormikProvider value={formik}>
        {error && (
          <Stack sx={{ width: "100%", marginBottom: 4 }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
              <strong>Try Again!!</strong>
            </Alert>
          </Stack>
        )}
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
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
                {["MALE", "FEMALE", "OTHER"].map((option) => (
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                type="email"
                label="Email address"
                {...getFieldProps("emailId")}
                error={Boolean(touched.emailId && errors.emailId)}
                helperText={touched.emailId && errors.emailId}
              />
              <TextField
                fullWidth
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 3,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            <LoadingButton size="mideum" type="submit" variant="contained">
              Create
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </LocalizationProvider>
  );
}
