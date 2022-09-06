import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import TopNavItem from "./TopNavItem";

// components
//

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const healthTech = [
    {
      title: "DocTalk",
      href: "/aboutus",
    },
    {
      title: "Buzzer",
      href: "/",
    },
  ];
  return (
    <RootStyle>
      <ToolbarStyle>
        <Button
          onClick={onOpenSidebar}
          aria-label="Menu"
          variant={"outlined"}
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon />
        </Button>
        <Box sx={{ display: { xs: "none", lg: "flex" } }}>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            width={1}
            paddingTop={3}
            flexDirection={{ lg: "row" }}
            // paddingRight={1}
          >
            <Box>
              <Button
                variant="outlined"
                component={Link}
                target="blank"
                color="secondary"
                to="/doctor/login"
                size="large"
                sx={{ color: "text.primary", marginRight: { lg: 2 } }}
              >
                LogIn
              </Button>
            </Box>
            <Box sx={{ display: { xs: "flex" } }} alignItems={"center"}>
              <Box marginRight={2}>
                <Typography
                  // style={{ textDecoration: 'underline' }}
                  color={"text.primary"}
                  component={Link}
                  to="/"
                  align="center"
                  variant="h6"
                >
                  About Us
                </Typography>
              </Box>
              <Box marginRight={2}>
                <Typography
                  // style={{ textDecoration: 'underline' }}
                  color={"text.primary"}
                  component={Link}
                  to="/speccialist"
                  align="center"
                  variant="h6"
                >
                  Our Specialists
                </Typography>
              </Box>
              {/* <Box marginRight={2}>
                <Typography
                  // style={{ textDecoration: 'underline' }}
                  color={"text.primary"}
                  component={Link}
                  to="/"
                  align="center"
                  variant="h6"
                >
                  Our Health Tech
                </Typography>
              </Box> */}
              <Box marginRight={2}>
                <TopNavItem
                  title={"Our Health Tech"}
                  id={"Health-Tech"}
                  items={healthTech}
                  colorInvert={false}
                />
              </Box>
              <Box marginRight={2}>
                <Typography
                  // style={{ textDecoration: 'underline' }}
                  color={"text.primary"}
                  component={Link}
                  to="/"
                  align="center"
                  variant="h6"
                >
                  Our Partner Clinics
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
