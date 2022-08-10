import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
// components
import { Logout } from '../../apigetway/actions/AdminAction';
import MenuPopover from '../../components/MenuPopover';
// mocks_
import adminAccount from '../../_mock/adminAccount';

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

  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const [email, setEmail] = useState(adminAccount.displayName);
  const [name, setName] = useState(adminAccount, email);
  const [profile, setProfile] = useState(adminAccount.femalephotoURL);
  const [adminId, setAdminId] = useState('123456789');

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      linkTo: '/admin',
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      linkTo: `/admin/profile/${adminId}`,
    },
  ];

  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin/login', { replace: true });
    }
    if (adminInfo) {
      setEmail(adminInfo.emailId);
      setName(adminInfo.fullName);
      setAdminId(adminInfo.adminId);
      if (adminInfo.gender.toLowerCase() === 'male') {
        setProfile(adminAccount.malephotoURL);
      }
    }
  }, [adminInfo, navigate]);

  const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };

  const logOutHandler = () => {
    // navigate('/superadmin/login', { replace: true });
    dispatch(Logout());
    setOpen(null);
  };

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
