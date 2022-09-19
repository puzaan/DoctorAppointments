import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SocialMedia = () => (
  <Box>
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-around"}
      paddingTop={5}
      flexDirection={{ xs: "column", lg: "row" }}
    >
      {/* <Box
        // display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        flexDirection={{ xm: "row", lg: "column" }}
        sx={{display:{xs: "none", lg:"flex"}}}
      >
        <Box height={1} width={1}>
          <a
            href="https://www.facebook.com/Xyba-Health-106379275529379"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              aria-label="delete"
              size={"large"}
              sx={{ color: (theme) => theme.palette.primary.facebook }}
            >
              <FacebookIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </a>
        </Box>
        <Box height={1} width={1}>
          <a
            href="https://www.youtube.com/channel/UCEZxPozsMFLcLhlmnhYGmSg/featured"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              size={"large"}
              sx={{ color: (theme) => theme.palette.primary.youtube }}
            >
              <YouTubeIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </a>
        </Box>
        <Box height={1} width={1}>
          <a
            href="https://www.tiktok.com/@xybahealth?is_from_webapp=1&sender_device=pc"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton
              size={"large"}
              sx={{ color: (theme) => theme.palette.primary.viber }}
            >
              <FaTiktok fontSize={"2.57rem"} />
            </IconButton>
          </a>
        </Box>
      </Box> */}

      <Box
        // paddingTop={10}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        component={Link}
        // sx={{ ':hover': { backgroundColor: 'white' } }}
        to="/"
        title="XYB"
        // width={{ xs: 150, md: 200 }}
      >
        <Box
          component={"img"}
          src={"/xyba_logo.png"}
          height={{ xs: 100, md: 100 }}
          width={{ xs: 100, md: 130 }}
        />
        <Typography variant={"body2"}>
          Health Management, Wellness Interaction
        </Typography>
      </Box>
      {/* <Box
        // paddingRight={5}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        flexDirection={{ xm: "row", lg: "column" }}
      >
        <Box height={1} width={1}>
          <IconButton
            size={"large"}
            sx={{ color: (theme) => theme.palette.primary.darker }}
          >
            <PhoneIcon sx={{ fontSize: "50px" }} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton
            size={"large"}
            sx={{ color: (theme) => theme.palette.primary.facebook }}
          >
            <FaFacebookMessenger fontSize={"2.57rem"} />
          </IconButton>
        </Box>
        <Box height={1} width={1}>
          <IconButton
            size={"large"}
            sx={{ color: (theme) => theme.palette.primary.viber }}
          >
            <FaViber fontSize={"2.57rem"} />
          </IconButton>
        </Box>
      </Box> */}
    </Box>
  </Box>
);

export default SocialMedia;
