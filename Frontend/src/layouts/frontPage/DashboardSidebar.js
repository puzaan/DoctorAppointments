import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Drawer, Button } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
// mock
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";
//
import NavItem from "./NavItem";
import NavItem2 from "../Main/components/Sidebar/components/SidebarNav/NavItem2";
import pages from "../pages";
import navConfig from "../NavConfig";
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
        items={pages.healthTech}
        icon={<HealthAndSafetyIcon color={"primary"} sx={{ marginRight: 2 }} />}
      />
      <NavItem2
        title={"Social Media"}
        items={pages.SocialMedia}
        icon={
          <ConnectWithoutContactIcon
            color={"primary"}
            sx={{ marginRight: 2 }}
          />
        }
      />
      <NavItem
        title={"Contact Us"}
        items={pages.contactUs}
        icon={<ContactSupportIcon color={"primary"} sx={{ marginRight: 2 }} />}
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
