import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { DoctorUpdateForm } from '../sections/auth/DoctorUpdateForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function DoctorUpdate() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  return (
    <Page title="Doctor Update">
      <RootStyle>
        <ContentStyle>
          <Typography variant="h3" gutterBottom>
            Edit Profile
          </Typography>
          <DoctorUpdateForm />
          {!smUp && (
            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              <Link variant="subtitle2" to="/superadmin/admin/list" component={RouterLink}>
                Go Back
              </Link>
            </Typography>
          )}
        </ContentStyle>
        {mdUp && (
          <SectionStyle>
            <img alt="Update Profile" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}
      </RootStyle>
    </Page>
  );
}
