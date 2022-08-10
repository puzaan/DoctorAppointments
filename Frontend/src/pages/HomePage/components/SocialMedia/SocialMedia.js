// import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok, FaFacebookMessenger, FaViber } from 'react-icons/fa';
import PhoneIcon from '@mui/icons-material/Phone';
import { IconButton, Box } from '@mui/material';

const SocialMedia = () => (
  <Box display={'flex'} flexWrap={'wrap'}>
    <Box marginTop={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Box>
        <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.facebook }}>
          <FacebookIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.youtube }}>
          <YouTubeIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <IconButton sx={{ color: (theme) => theme.palette.primary.viber }}>
          <FaTiktok />
        </IconButton>
        <IconButton sx={{ color: (theme) => theme.palette.primary.facebook }}>
          <FaFacebookMessenger sx={{ fontSize: 2 }} />
        </IconButton>
        <IconButton sx={{ color: (theme) => theme.palette.primary.viber }}>
          <FaViber />
        </IconButton>
        <IconButton size={'large'} sx={{ color: (theme) => theme.palette.primary.darker }}>
          <PhoneIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

export default SocialMedia;
