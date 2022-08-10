import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
// components
import { DoctorLogout } from '../../apigetway/actions/DoctorAction';
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);
  const [name, setName] = useState('Doctor');
  const [email, setEmail] = useState('doctor@gmail.com');
  const [profile, setProfile] = useState(account.photoURL);
  const [docId, setDocId] = useState('123456789');
  const dispatch = useDispatch();
  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;
  // console.log(doctorInfo);

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      linkTo: '/doctor/app',
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      linkTo: `/doctor/profile/${docId}`,
    },
  ];
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logOutHandler = () => {
    // navigate('/superadmin/login', { replace: true });
    dispatch(DoctorLogout());
    setOpen(null);
  };
  useEffect(() => {
    if (doctorInfo) {
      setName(doctorInfo.fullName);
      setEmail(doctorInfo.emailId);
      setDocId(doctorInfo.doctorId);
      setProfile(doctorInfo.profilePhotoLink);

      // if (doctorInfo.profilePhotoLink) {
      //   setProfile(doctorInfo.profilePhotoLink);
      // }
    } else {
      navigate('/doctor/login', { replace: true });
    }
  }, [doctorInfo, navigate]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Stack direction="row" spacing={2}>
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar src={profile} alt="photoURL" />
          </StyledBadge>
        </Stack>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {superAdminInfo.fullName} */}
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logOutHandler} sx={{ m: 1 }}>
          <Box sx={{ textDecoration: 'none', color: 'text.primary' }}>Logout</Box>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
