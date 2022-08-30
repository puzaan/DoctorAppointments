import * as Yup from "yup";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { DoctorLogin } from "../../../apigetway/actions/DoctorAction";
import Error from "../../../pages/Error";
import Loder from "../../../pages/Loading";
// component

DoctorLoginForm.propTypes = {
  paths: PropTypes.string,
};

export default function DoctorLoginForm({ paths }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { loading, error, doctorInfo } = doctorLogin;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (doctorInfo) {
      navigate(paths, { replace: true });
    }
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(DoctorLogin(values.email, values.password));
    },
  });
  // console.log(adminInfo);
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      {error && <Error>{error}</Error>}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="text"
            label="Email Id"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          /> */}

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/doctor/forgot"
            underline="hover"
          >
            Forgot password?
          </Link>
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/doctor/signup"
            underline="hover"
          >
            Sign Up
          </Link>
        </Stack>
        {loading && <Loder />}

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
