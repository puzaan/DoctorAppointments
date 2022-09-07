import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";

import NavItem from "./NavItem";

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

const Topbar = ({ onSidebarOpen}) => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Box
        display={"flex"}
        component={Link}
        to="/"
        title="Xyba.health"
        width={{ xs: 100, md: 120 }}
      >
        <Box component={"img"} src={"/xyba_logo.png"} height={1} width={1} />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
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
        <Box marginRight={2}>
          <NavItem
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
        <Box marginRight={2}>
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
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }} alignItems={"center"}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={"outlined"}
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
