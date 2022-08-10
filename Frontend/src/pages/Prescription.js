// @mui

import { Container, Typography, Box, Stack } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { PrescriptionCreateForm } from '../sections/auth/PrescriptionCreateForm';
// ----------------------------------------------------------------------

export default function Prescription() {
  return (
    <Page title="Prescription">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Prescription
          </Typography>
        </Stack>
        <Box display={'flex'} justifyContent={'center'}>
          <Box maxWidth={500}>
            <PrescriptionCreateForm />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
