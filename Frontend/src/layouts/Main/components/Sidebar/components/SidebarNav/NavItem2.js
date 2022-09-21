import React from "react";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

const NavItem2 = ({ title, items, icon }) => {
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
              <Grid item key={i} xs={items.length > 12 ? 6 : 12}>
                <Box
                  component={"a"}
                  href={p.href}
                  rel="noreferrer"
                  target="_blank"
                  display={"flex"}
                  alignItems={"center"}
                >
                  <IconButton
                    aria-label="delete"
                    size={"large"}
                    sx={{ color: p.color }}
                  >
                    {p.icon}
                  </IconButton>
                  <Typography color={"text.primary"}>{p.title}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

NavItem2.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default NavItem2;
