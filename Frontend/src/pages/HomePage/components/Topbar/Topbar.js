import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Topbar = ({ colorInvert = false }) => {
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box display={'flex'} justifyContent={'end'} alignItems={'center'} width={1} paddingTop={3}>
      <Box sx={{ display: { xs: 'flex' } }} alignItems={'center'} >
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            to="/"
          >
            About Us
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            to="/"
          >
            Our Specialist
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            to="/"
          >
            Our Health Tech
          </Typography>
        </Box>
        <Box marginLeft={1}>
          <Typography
            // style={{ textDecoration: 'underline' }}
            color={linkColor}
            component={Link}
            to="/"
          >
            Our Patner Clinic
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  colorInvert: PropTypes.bool,
};

export default Topbar;
