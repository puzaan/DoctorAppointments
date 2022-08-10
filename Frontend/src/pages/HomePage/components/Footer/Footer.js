import React from 'react';
import { Box, Divider, Paper } from '@mui/material';

import { Link } from 'react-router-dom';
import { SocialMedia } from '../SocialMedia';

const Footer = () => (
  <Box
    display={'flex'}
    flexDirection={'column'}
    width={'100%'}
    flex-shrink={0}
    elevation={3}
    paddingTop={5}
    sx={{ pb: 7 }}
  >
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <Box display={'flex'} justifyContent={'start'} component={Link} to="/" width={100} marginLeft={3}>
        <Box component={'img'} src={'/xyba_logo.png'} height={1} width={1} />
      </Box>
      <Box>
        <Divider />
      </Box>
      <Box>
        <SocialMedia />
      </Box>
    </Paper>
  </Box>
);

export default Footer;
