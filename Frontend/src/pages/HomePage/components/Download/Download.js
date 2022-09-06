/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Typography, Grid } from "@mui/material";
import PhoneSkeletonIllustration from "../../PhoneSkeleton";

const Download = () => (
  <Grid container spacing={4}>
    <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
      <Box
        sx={{
          maxWidth: 450,
          position: "relative",
          marginX: "auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "2.75rem",
            boxShadow: 1,
            width: "75% !important",
            marginX: "auto",
          }}
        >
          <Box>
            <Box
              position={"relative"}
              zIndex={2}
              maxWidth={1}
              height={"auto"}
              sx={{ verticalAlign: "middle" }}
            >
              <PhoneSkeletonIllustration />
            </Box>
            <Box
              position={"absolute"}
              top={"2.4%"}
              left={"4%"}
              width={"92.4%"}
              height={"96%"}
              sx={{
                "& .lazy-load-image-loaded": {
                  height: 1,
                  width: 1,
                },
              }}
            >
              <Box
                component={LazyLoadImage}
                effect="blur"
                src={
                  // 'https://assets.maccarianagency.com/screenshots/crypto-mobile.png'
                  "assets/mobileapp.jpg"
                }
                alt="Image Description"
                width={1}
                height={1}
                sx={{
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
    <Grid item container alignItems={"center"} xs={12} md={6}>
      <Box>
        <Box marginBottom={2}>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              fontWeight: 700,
            }}
          >
            Manage your cases and patients better
          </Typography>
        </Box>
        <Box marginBottom={3}>
          <Typography variant="h6" component="p" color="text.secondary">
            AI Enabled
          </Typography>
        </Box>
        <Box display="flex"  margin={1}>
          <Box
            width={150}
            height={54}
            component={"a"}
            href="https://play.google.com/store/apps/details?id=health.xyba.docTalk&hl=en&gl=US"
            rel="noreferrer"
            target="_blank"
          >
            <Box component={"img"} src={"assets/play.png"} alt={"Play store"} />
          </Box>
          <Box width={150} height={54}>
            <Box component={"img"} src={"assets/apple.png"} alt={"app store"} />
          </Box>
        </Box>
      </Box>
    </Grid>
  </Grid>
);

export default Download;
