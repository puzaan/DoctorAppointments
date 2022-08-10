import { useEffect, useState } from 'react';
// import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

// material
import { Stack, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
// component
import { UpdateDoctor, ViewDoctor } from '../../../apigetway/actions/DoctorAction';
import Loder from '../../../pages/Loading';
import Error from '../../../pages/Error';
import { DOCTOR_UPDATE_RESET } from '../../../apigetway/constants/DoctorConstants';

// ----------------------------------------------------------------------

export default function DoctorUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doctorView = useSelector((state) => state.doctorView);
  const { error: viewError, success: viewSuccess, loading: viewLoading, doctor } = doctorView;
  const [field, setField] = useState('');
  const [value, setValue] = useState('');

  const doctorUpdate = useSelector((state) => state.doctorUpdate);
  const { success, error } = doctorUpdate;

  useEffect(() => {
    dispatch(ViewDoctor(id));
    if (success) {
      dispatch({ type: DOCTOR_UPDATE_RESET });
      setField('');
      setValue('');

      // window.location.reload(false);
    }
  }, [dispatch, navigate, id, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateDoctor(id, field, value));
    console.log(field, value);
  };

  const back = () => {
    navigate('/superadmin/doctor');
  };
  return (
    <>
      {viewLoading && <Loder />}
      {viewError && <Error>{viewError}</Error>}
      {viewSuccess && (
        <>
          <Stack spacing={3} marginBottom={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField variant="outlined" fullWidth disabled value={`Full Name: ${doctor.fullName}`} />
              <TextField variant="outlined" fullWidth disabled value={`NMC Number: ${doctor.NMC_number}`} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                disabled
                // label={doctor.fullName}
                value={`Address: ${doctor.address}`}
              />
              <TextField variant="outlined" disabled fullWidth value={`Contact No: ${doctor.contactNumber}`} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                disabled
                // label={doctor.fullName}
                value={`Gender: ${doctor.gender}`}
              />
              <TextField variant="outlined" disabled fullWidth value={`Role: ${doctor.role}`} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField variant="outlined" disabled fullWidth value={`Email Id: ${doctor.emailId}`} />
            </Stack>
          </Stack>

          {error && <Error>{error}</Error>}
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Update text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <TextField
                  select
                  label="Select to Field Edit"
                  variant="outlined"
                  fullWidth
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                >
                  {['fullName', 'address', 'emailId', 'gender', 'contactNumber', 'role', 'NMC_number'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <LoadingButton size="mideum" type="submit" variant="contained">
                  Update
                </LoadingButton>
                <LoadingButton size="mideum" variant="contained" onClick={back}>
                  Go Back
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </>
  );
}
