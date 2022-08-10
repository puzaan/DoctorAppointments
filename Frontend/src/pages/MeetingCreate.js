import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Stack } from '@mui/material';
import { AdminMeetingCreateForm } from '../sections/auth/AdminCreateMeeting';

import Page from '../components/Page';
import { ViewBooking } from '../apigetway/actions/BookingAction';
import Error from './Error';
import Loder from './Loading';

export default function MeetingCreate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingView = useSelector((state) => state.bookingView);
  const { success: bookingViewSuccess, error: bookingError, loading: bookingLoading, booking } = bookingView;

  useEffect(() => {
    dispatch(ViewBooking(id));
  }, [dispatch, id]);
  return (
    <Page title="MeetingCreate">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Meeting
          </Typography>
        </Stack>
        {bookingError && <Error>{bookingError}</Error>}
        {bookingLoading && <Loder />}
        {bookingViewSuccess && (
          <>
            <Box display={'flex'} justifyContent={'center'}>
              <Box maxWidth={500}>
                <AdminMeetingCreateForm data={booking} />
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}
