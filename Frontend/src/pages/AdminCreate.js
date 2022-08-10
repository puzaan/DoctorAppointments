// @mui

import { Container, Typography, Box, Stack } from '@mui/material';
import { AdminCreateForm } from '../sections/auth/adminCreateForm';

// components
import Page from '../components/Page';
// sections
// ----------------------------------------------------------------------

export default function AdminCreate() {
  return (
    <Page title="AdminCreate">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Admin Role
          </Typography>
        </Stack>
        <Box display={'flex'} justifyContent={'center'}>
          <Box maxWidth={500}>
            <AdminCreateForm />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
