import React from "react";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NavItem = ({ title, items, icon }) => {
  const theme = useTheme();
  //   const [activeLink, setActiveLink] = useState("");
  //   useEffect(() => {
  //     setActiveLink(window && window.location ? window.location.pathname : "");
  //   }, []);

  //   const hasActiveLink = () => items.find((i) => i.href === activeLink);

  return (
    <Box sx={{ p: 1 }}>
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ paddingLeft: 2 }}
        >
          {icon}

          <Typography fontWeight={400} color={"primary.main"}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Grid container spacing={1}>
            {items.map((p, i) => (
              <Grid item key={i} xs={12}>
                <Button
                  size={"large"}
                  component={Link}
                  to={p.href}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    color: "primary.main",
                    // backgroundColor:
                    //   activeLink === p.href
                    //     ? alpha(theme.palette.primary.main, 0.1)
                    //     : "transparent",
                    fontWeight: 400,
                  }}
                >
                  {p.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

NavItem.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default NavItem;
