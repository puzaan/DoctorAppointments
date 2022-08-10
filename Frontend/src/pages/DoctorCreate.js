// @mui

import { Container, Typography, Box, Stack } from '@mui/material';
import { DoctorCreateForm } from '../sections/auth/doctorCreateForm';

// components
import Page from '../components/Page';
// sections
// ----------------------------------------------------------------------

export default function DoctorCreate() {
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
            <DoctorCreateForm />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
