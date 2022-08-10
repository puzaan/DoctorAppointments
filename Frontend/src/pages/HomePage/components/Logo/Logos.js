import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok, FaViber, FaFacebookMessenger } from 'react-icons/fa';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';

const SocialMedia = () => (
  <Box>
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'space-around'}
      paddingTop={5}
      flexDirection={{ xs: 'column', lg: 'row' }}
    >
      <Box
        // paddingLeft={5}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        flexDirection={{ xm: 'row', lg: 'column' }}
        // display={{ xm: 'none' }}
      >
        <Box height={1} width={1}>
          <IconButton aria-label="delete" size={'large'} sx={{ color: (theme) => theme.palette.primary.facebook }}>
            <FacebookIcon sx={{ fontSize: '60px' }} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.youtube }}>
            <YouTubeIcon sx={{ fontSize: '60px' }} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.viber }}>
            <FaTiktok fontSize={'2.57rem'} />
          </IconButton>
        </Box>
      </Box>

      <Box
        // paddingTop={10}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        component={Link}
        sx={{ ':hover': { backgroundColor: 'white' } }}
        to="/"
        title="XYB"
        // width={{ xs: 150, md: 200 }}
      >
        <Box component={'img'} src={'/xyba_logo.png'} height={{ xs: 100, md: 200 }} width={{ xs: 100, md: 200 }} />
      </Box>
      <Box
        // paddingRight={5}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
        flexDirection={{ xm: 'row', lg: 'column' }}
      >
        <Box height={1} width={1}>
          <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.darker }}>
            <PhoneIcon sx={{ fontSize: '50px' }} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.facebook }}>
            <FaFacebookMessenger fontSize={'2.57rem'} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.viber }}>
            <FaViber fontSize={'2.57rem'} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default SocialMedia;
