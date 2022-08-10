import { Link as RouterLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';

// components
import Page from '../components/Page';
// sections

import Loder from './Loading';
import Error from './Error';
import { MeetingView } from '../apigetway/actions/MeetingAction';
import { MeetingDetailView } from '../sections/auth/MeetingDetail';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    flexDirection: 'column',
  },
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

export default function MeetingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const meetingDetail = useSelector((state) => state.meetingDetail);
  const { error, loading, success, meeting } = meetingDetail;

  useEffect(() => {
    dispatch(MeetingView(id));
  }, [dispatch, id]);
  return (
    <Page title="Meeting view">
      <RootStyle>
        <ContentStyle>
          {error && <Error>{error}</Error>}
          {loading && <Loder />}
          {success && (
            <>
              <MeetingDetailView data={meeting} />
            </>
          )}

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
            <Link variant="subtitle2" to="/doctor/booking" component={RouterLink}>
              Go Back
            </Link>
          </Typography>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
