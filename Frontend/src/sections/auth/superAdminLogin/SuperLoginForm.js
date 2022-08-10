import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  AlertTitle,
  Alert,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Box,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../../../apigetway/actions/SuperAdminAction';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

SuperLoginForm.propTypes = {
  paths: PropTypes.string,
};

export default function SuperLoginForm({ paths }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const superAdminLogin = useSelector((state) => state.superAdminLogin);
  const { loading, error, superAdminInfo } = superAdminLogin;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (superAdminInfo) {
      navigate(paths, { replace: true });
    }
  });
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      dispatch(Login(values.username, values.password));
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {error && (
        <Stack sx={{ width: '100%', marginBottom: 4 }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            User Name or Password did not match — <strong>Try Again!!</strong>
          </Alert>
        </Stack>
      )}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="User Name"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <CircularProgress />
          </Box>
        )}

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
