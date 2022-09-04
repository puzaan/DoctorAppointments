import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const DoctorCard = ({ name, specialization, photo, mbbs, key }) => {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} sm={6} md={3} key={key}>
        <Box
          component={Card}
          boxShadow={2}
          sx={{
            textDecoration: "none",
            transition: "all .2s ease-in-out",
            "&:hover": {
              transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
          }}
        >
          <CardContent>
            <Box component={Avatar} src={photo} height={80} width={80} />
            <Box marginTop={4}>
              <ListItemText primary={name} secondary={specialization} />
              <Typography variant={"subtitle2"} color={"text.secondary"}>
                {mbbs}
              </Typography>
              <Box marginTop={4}>
                <IconButton size={"small"} color={"primary"}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size={"small"} color={"primary"}>
                  <GitHubIcon />
                </IconButton>
                <IconButton size={"small"} color={"primary"}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Grid>
    </>
  );
};


DoctorCard.propTypes = {
  specialization: PropTypes.any,
  name: PropTypes.string,
  photo: PropTypes.any,
  mbbs: PropTypes.any,
  key: PropTypes.any,
};

export default DoctorCard;
