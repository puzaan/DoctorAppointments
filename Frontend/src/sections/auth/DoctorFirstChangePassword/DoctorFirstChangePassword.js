import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// material
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { DoctorFirstPasswordChange } from "../../../apigetway/actions/DoctorAction";
import Error from "../../../pages/Error";
import { DOCTOR_PASSWORD_CHANGE_RESET } from "../../../apigetway/constants/DoctorConstants";

// ----------------------------------------------------------------------

export default function DoctorFirstChangePassword() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const doctorPasswordChange = useSelector(
    (state) => state.doctorPasswordChange
  );

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;
  const { error: errorData, success } = doctorPasswordChange;

  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("email is required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .required("Password is required"),
    code: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .min(4, "Too Short!")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ForgotSchema,
    onSubmit: () => {
      if (values.password !== values.confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        dispatch(
          DoctorFirstPasswordChange(values.email, values.code, values.password)
        );
      }
      // dispatch(DoctorForgotPasswordChange(values.email, values.password));
    },
  });
  // eslint-disable-next-line
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const goback = () => {
    navigate("/doctor/login", { replace: true });
  };
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: DOCTOR_PASSWORD_CHANGE_RESET });
      navigate("/doctor/login", { replace: true });
    }

    if (doctorInfo.passwordChanged) {
      navigate("/doctor/booking", { replace: true });
    }
  });
  return (
    <FormikProvider value={formik}>
      {errorData && <Error>{errorData}</Error>}
      {message && <Error>{message}</Error>}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email Id"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="code"
            label="Code"
            {...getFieldProps("code")}
            error={Boolean(touched.code && errors.code)}
            helperText={touched.code && errors.code}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Confir Password"
            {...getFieldProps("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>
        {/* {loading && <Loder />} */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
          sx={{ my: 2 }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            submin
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={goback}
          >
            Go Back
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
