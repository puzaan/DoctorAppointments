import React from 'react';
import { Box } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

const Loder = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
    <CircularProgress />
  </Box>
);

export default Loder;
