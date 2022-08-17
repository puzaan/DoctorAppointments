import * as Yup from 'yup';
import PropTypes from 'prop-types';

// material
import { Box, Card, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';

import { AdminDoctorPasswordChange } from '../../../apigetway/actions/DoctorAction';
import Error from '../../../pages/Error';
import { DOCTOR_UPDATE_RESET } from '../../../apigetway/constants/DoctorConstants';

// ----------------------------------------------------------------------

export default function AdminPasswordChangeDoctor({ docId }) {
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const doctorPasswordChange = useSelector((state) => state.doctorPasswordChange);
  const { error, success } = doctorPasswordChange;

  const ForgotSchema = Yup.object().shape({
    password: Yup.string().min(4, 'Too Short!').required('Password is required'),
    confirmPassword: Yup.string().min(4, 'Too Short!').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ForgotSchema,
    onSubmit: () => {
      if (values.password !== values.confirmPassword) {
        setMessage('Passwords do not match');
      } else {
        dispatch(AdminDoctorPasswordChange(docId, values.password));
      }
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  useEffect(() => {
    if (success) {
      window.location.reload(false);
      dispatch({ type: DOCTOR_UPDATE_RESET });
    }
  });
  return (
    <Box
      component={Card}
      variant={"outlined"}
      spacing={2}
      padding={2}
      margin={4}
      bgcolor={"transparent"}
      maxWidth={500}
    >
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <FormikProvider value={formik}>
        {error && <Error>{error}</Error>}
        {message && <Error>{message}</Error>}
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
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
              Change Password
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}

AdminPasswordChangeDoctor.propTypes = {
  docId: PropTypes.string,
};
