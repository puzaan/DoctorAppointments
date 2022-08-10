import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled,Box, Button, Card, Divider, Link, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

// components
import Page from '../components/Page';
// sections
import {
  SuperBookingCancel,
  SuperBookingApproved,
  SuperViewBooking,
} from '../apigetway/actions/BookingAction';

import Loder from './Loading';
import Error from './Error';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 2, 2, 2),
  borderRadius: 0,
}));

const ContentStyle = styled('div')(() => ({
  width: 500,
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function SuperAdminBookingView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const denieDispatch = useDispatch();
  const acceptDispatch = useDispatch();

  const bookingCancel = useSelector((state) => state.bookingCancel);
  const { error: cancelError, success: cancelSuccess } = bookingCancel;

  const bookingApproved = useSelector((state) => state.bookingApproved);
  const { error, success } = bookingApproved;

  const bookingView = useSelector((state) => state.bookingView);
  const { error: bookingError, loading: bookingLoading, booking } = bookingView;

  const calcel = () => {
    denieDispatch(SuperBookingCancel(id));
  };
  const accept = () => {
    acceptDispatch(SuperBookingApproved(id));
  };

  useEffect(() => {
    dispatch(SuperViewBooking(id));
    if (cancelSuccess) {
      window.location.reload(false);
    }
  }, [dispatch, id, success, cancelSuccess, denieDispatch]);

  return (
    <Page title="BookingView">
      <RootStyle>
        <ContentStyle>
          {error && <Error>{error}</Error>}
          {cancelError && <Error>{cancelError}</Error>}
          {bookingLoading ? (
            <Loder />
          ) : (
            <>
              <SectionStyle>
                <Typography variant="h4" gutterBottom align="center" marginTop={1}>
                  Booking Details
                </Typography>
                <Divider sx={{ my: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ..
                  </Typography>
                </Divider>

                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Full Name:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.fullName}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Contact Number:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.contact}
                  </Typography>
                </Box>

                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Email Id:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.email}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Address:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.address}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Booking Date:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.bookingdate}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Time:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.timeslot}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Sex:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.sex}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    DOB:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.age}
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} paddingLeft={1}>
                  <Typography variant="h6" gutterBottom paddingRight={1}>
                    Doctor Id:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {booking.doctorId}
                  </Typography>
                </Box>
              </SectionStyle>
              <Stack direction="row" spacing={2} justifyContent={'center'}>
                {booking.approved ? (
                  <Button variant="contained" startIcon={<CancelIcon />} color="error" onClick={() => calcel()}>
                    Cancel
                  </Button>
                ) : (
                  <Button variant="outlined" startIcon={<DoneIcon />} onClick={() => accept()}>
                    Accept
                  </Button>
                )}
              </Stack>
            </>
          )}
          {bookingError && <Error>{bookingError}</Error>}
          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            <Link variant="subtitle2" to="/superadmin/booking/list" component={RouterLink}>
              Go Back
            </Link>
          </Typography>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
