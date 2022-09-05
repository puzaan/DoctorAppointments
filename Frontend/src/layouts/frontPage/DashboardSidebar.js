import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer, Button } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
// mock
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//
import navConfig from "./NavConfig";
import NavItem from "./NavItem";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const isDesktop = useResponsive("up", "lg");

  const SocialMedia = [
    {
      title: "Facebook",
      link: "https://www.facebook.com/Xyba-Health-106379275529379",
    },
    {
      title: "Youtube",
      link: "https://www.youtube.com/channel/UCEZxPozsMFLcLhlmnhYGmSg/featured",
    },
    {
      title: "Tiktork",
      link: "https://www.tiktok.com/@xybahealth?is_from_webapp=1&sender_device=pc",
    },
  ];

  const healthTech = [
    {
      title: "DocTalk",
      link: "/",
    },
    {
      title: "Career Lising",
      link: "/",
    },
  ];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      <NavSection navConfig={navConfig} />
      <NavItem
        title={"Our Health Teach"}
        items={healthTech}
        icon={<HealthAndSafetyIcon color={"primary"} sx={{ marginRight: 2 }} />}
      />
      <NavItem
        title={"Social Media"}
        items={SocialMedia}
        icon={
          <ConnectWithoutContactIcon
            color={"primary"}
            sx={{ marginRight: 2 }}
          />
        }
      />
      <Box sx={{ flexGrow: 1 }} />
      <Box marginBottom={5} padding={2}>
        <Button
          variant="outlined"
          fullWidth
          component={RouterLink}
          target="blank"
          color="secondary"
          to="/doctor/login"
        >
          Login
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {/* {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )} */}
    </RootStyle>
  );
}
