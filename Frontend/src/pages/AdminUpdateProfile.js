import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// mui
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Loder from './Loading';
import Error from './Error';
import Page from '../components/Page';

// import { PasswordChange } from '../sections/auth/PasswordChange';
import { AdminUpdateAdmin, AdminViewAdmin } from '../apigetway/actions/AdminAction';
import { ADMIN_UPDATE_RESET } from '../apigetway/constants/AdminConstants';
import { AdminPasswordChanges } from '../sections/auth/AdminPasswordChange';

const AdminUpdateProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const adminView = useSelector((state) => state.adminView);
  const { error: viewError, success: viewSuccess, loading: viewLoading, admin } = adminView;

  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { success, error } = adminUpdate;

  const [fullName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [emailId, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const updateName = () => {
    dispatch(AdminUpdateAdmin(id, 'fullName', fullName));
  };

  const updateAddress = () => {
    dispatch(AdminUpdateAdmin(id, 'address', address));
  };
  const updateGender = () => {
    dispatch(AdminUpdateAdmin(id, 'gender', gender));
  };

  const updateEmail = () => {
    dispatch(AdminUpdateAdmin(id, 'emailId', emailId));
  };
  const updateNumber = () => {
    dispatch(AdminUpdateAdmin(id, 'contactNumber', contactNumber));
  };

  useEffect(() => {
    dispatch(AdminViewAdmin(id));
    if (success) {
      window.location.reload(false);
      dispatch({ type: ADMIN_UPDATE_RESET });
    }
  }, [id, success, dispatch]);
  return (
    <Page title="Update Profile">
      {viewLoading && <Loder />}
      {viewError && <Error>{viewError}</Error>}
      {error && <Error>{error}</Error>}
      {viewSuccess && (
        <>
          <Box
            component={Card}
            variant={'outlined'}
            spacing={2}
            padding={2}
            margin={4}
            bgcolor={'transparent'}
            display={'flex'}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Box component={Grid} display={'flex'} container alignItems={'center'} spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Full Name
                </Typography>
                <TextField
                  label={admin.fullName}
                  variant="outlined"
                  name={'fullName'}
                  fullWidth
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button variant="outlined" disabled={fullName === ''} onClick={updateName} startIcon={<EditIcon />}>
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Address
                </Typography>
                <TextField
                  label={admin.address}
                  variant="outlined"
                  name={'address'}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button variant="outlined" disabled={address === ''} onClick={updateAddress} startIcon={<EditIcon />}>
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Gender
                </Typography>
                <TextField
                  label={admin.gender}
                  variant="outlined"
                  name={'gender'}
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button variant="outlined" disabled={gender === ''} onClick={updateGender} startIcon={<EditIcon />}>
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  email Id
                </Typography>
                <TextField
                  label={admin.emailId}
                  variant="outlined"
                  name={'emailId'}
                  fullWidth
                  type={'email'}
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button variant="outlined" disabled={emailId === ''} onClick={updateEmail} startIcon={<EditIcon />}>
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Contact Number
                </Typography>
                <TextField
                  label={admin.contactNumber}
                  variant="outlined"
                  name={'contactNumber'}
                  fullWidth
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={contactNumber === ''}
                  onClick={updateNumber}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <AdminPasswordChanges adminId={id} />
          </Box>
        </>
      )}
    </Page>
  );
};

export default AdminUpdateProfile;
