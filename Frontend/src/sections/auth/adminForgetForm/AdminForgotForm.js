import * as Yup from 'yup';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
// import Error from '../../../pages/Error';
// import Loder from '../../../pages/Loading';
// component

// ----------------------------------------------------------------------

AdminForgotForm.propTypes = {
  paths: PropTypes.string,
};

export default function AdminForgotForm() {
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/app', { replace: true });
    }
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {},
  });
  // eslint-disable-next-line
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const goback = () => {
    navigate('/admin/login', { replace: true });
  };
  return (
    <FormikProvider value={formik}>
      {/* {error && <Error>{error}</Error>} */}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="text"
            label="Email Id"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>
        {/* {loading && <Loder />} */}

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3} sx={{ my: 2 }}>
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Submit
          </LoadingButton>
          <LoadingButton fullWidth size="large" variant="contained" onClick={goback}>
            Go Back
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
