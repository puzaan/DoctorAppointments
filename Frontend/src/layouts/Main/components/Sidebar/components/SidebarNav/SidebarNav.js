import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import NavSection from "../../../../../../components/NavSection";
import NavItem from "./NavItem";
import NavItem2 from "./NavItem2";
import pages from "../../../../../pages";
import navConfig from "../../../../../NavConfig";

const SidebarNav = () => (
  <Box>
    <Box width={1} paddingX={2} paddingY={1}>
      <Box
        display={"flex"}
        component={Link}
        to="/"
        title="Xyba.health"
        width={{ xs: 100, md: 120 }}
      >
        <Box component={"img"} src={"/xyba_logo.png"} height={1} width={1} />
      </Box>
    </Box>
    <Box paddingX={1} paddingY={1}>
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

      <NavItem2
        title={"Contact Us"}
        items={pages.contactUs}
        icon={<HealthAndSafetyIcon color={"primary"} sx={{ marginRight: 2 }} />}
      />

      <Box marginTop={2}>
        <Button
          size={"large"}
          variant="outlined"
          fullWidth
          component={Link}
          target="blank"
          color="secondary"
          to="/doctor/login"
        >
          Login
        </Button>
      </Box>
    </Box>
  </Box>
);

export default SidebarNav;
