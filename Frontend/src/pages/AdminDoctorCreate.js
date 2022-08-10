// @mui
import { Container, Typography, Box, Stack } from '@mui/material';
import { AdminDoctorCreateForm } from '../sections/auth/AdminDoctorCreateForm';

// components
import Page from '../components/Page';
// sections
// ----------------------------------------------------------------------

export default function AdminDoctorCreate() {
  return (
    <Page title="DoctorCreate">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Doctor
          </Typography>
        </Stack>
        <Box display={'flex'} justifyContent={'center'}>
          <Box maxWidth={500}>
            <AdminDoctorCreateForm />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
