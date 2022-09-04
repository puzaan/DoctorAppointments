import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Topbar = ({ colorInvert = false }) => {
  const linkColor = colorInvert ? "common.white" : "text.primary";

  return (
    <Box sx={{ display: { xs: "none", lg:'flex' } }}>
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
            variant="contained"
            color="primary"
            component={Link}
            target="blank"
            to="/doctor/login"
            size="large"
          >
            LogIn
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex" } }} alignItems={"center"}>
          <Box marginRight={2}>
            <Typography
              // style={{ textDecoration: 'underline' }}
              color={linkColor}
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
              color={linkColor}
              component={Link}
              to="/"
              align="center"
              variant="h6"
            >
              Our Specialists
            </Typography>
          </Box>
          <Box marginRight={2}>
            <Typography
              // style={{ textDecoration: 'underline' }}
              color={linkColor}
              component={Link}
              to="/"
              align="center"
              variant="h6"
            >
              Our Health Tech
            </Typography>
          </Box>
          <Box marginRight={2}>
            <Typography
              // style={{ textDecoration: 'underline' }}
              color={linkColor}
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
  );
};

Topbar.propTypes = {
  colorInvert: PropTypes.bool,
};

export default Topbar;
