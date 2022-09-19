import {
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SpeedIcon from "@mui/icons-material/Speed";
import ReactTyped from "react-typed";
import Container from "../components/Container";
import Page from "../components/Page";
import { Main } from "../layouts/Main";

const mock = [
  {
    title: "Health Management",
    subtitle:
      "All of the details about your patients in SOAP format. Input, Archival, Share and Retrieval functions.",
    icon: (
      <svg
        width={40}
        height={40}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    title: "Fast and Smooth",
    subtitle:
      "Create and share easily. Archive and retrieve with ease. Doctalk is easy on your eyes.",
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Less Space",
    subtitle:
      "At less than 60 Mb in IOS and less than 10 Mb in Android, Doctalk won’t burden your device storage. We also understand that you need to save on cellular data which many of you have to use.",
    icon: <DonutSmallIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "More Features",
    subtitle:
      " Ask for recommendations from qualified specialists or collect resources for rural hospitals. You will also be able to share your research or ask for input for your articles.",
    icon: (
      <svg
        width={40}
        height={40}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },

  {
    title: "Best Design",
    subtitle:
      "We value your time and understand your pressures from cases, research and education. We also care about your Data Pack costs and eye-health. Even as a new user, you will feel right at home at Doctalk.",
    icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Cross Device Support ",
    subtitle:
      "Android ? IOS ? We’ve got you covered. We are coming up with Mac and Windows Desktop versions too",
    icon: <PhoneIphoneIcon sx={{ fontSize: 40 }} />,
  },
];

const DocTalk = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Page title="Form">
      <Main />
      <Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography
            component={"span"}
            variant="h3"
            color={"primary"}
            fontWeight={700}
            align={"center"}
            sx={{
              background: `linear-gradient(180deg, transparent 82%, ${alpha(
                theme.palette.secondary.main,
                0.3
              )} 0%)`,
            }}
          >
            <ReactTyped
              loop
              typeSpeed={100}
              backSpeed={75}
              strings={[
                "Manage your client health details.",
                "Get help for your patients.",
                "Ask for input from highly qualified specialists.",
                "Gather resources for your rural hospitals.",
                "FREE",
              ]}
              smartBackspace
              shuffle={false}
              backDelay={1}
              fadeOut={false}
              fadeOutDelay={100}
              loopCount={0}
              showCursor
              cursorChar="|"
            />
          </Typography>
        </Box>
        <Container>
          <Box>
            <Grid container spacing={4} direction={isMd ? "row" : "column"}>
              <Grid item container alignItems={"center"} xs={12} md={8}>
                <Box>
                  <Typography
                    variant={"h4"}
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 700 }}
                  >
                    About DocTalk
                  </Typography>
                  <Typography component={"p"} align="justify">
                    We address Medical Data loss in Nepal and South Asia.
                    Whenever a patient, mostly poor and underprivileged goes to
                    see a doctor for their medical condition, hospital gives
                    them a booklet with information : Complaints, Observations,
                    Diagnosis, Assessments, Treatment, Plan, Prescriptions and
                    Follow-up. No separate records are kept.
                    <br />
                    Very commonly they lose booklet. So, when patient sees the
                    same or another doctor for the same or another issue, there
                    is no record.
                    <br />
                    Similarly, most Doctors in rural and underserved communities
                    are young and have only 4 year Bachelor of Medicine and
                    Bachelor of Surgery (MBBS) education plus 1.5 years of
                    internship. They cannot diagnose and intervene in cases of
                    congenital malfunction or serious cases. There is no way for
                    them to ask for suggestions from Specialists who would be
                    able to guide, instruct or suggest.
                    <br />
                    Very often, the poor or sick in rural areas need to be
                    referred to a specialized hospital in a large city. There is
                    organizational and budgetary support for such cases from the
                    government, charities, large hospitals and medical colleges.
                    The young doctor does not know HOW, WHERE etc. Our App,
                    Doctalk, solves this Information Assymetry and lets doctors
                    or team of doctors, collaborate, keep and share medical
                    records, ask for suggestions and support for both the doctor
                    and on behalf of the patient. With Doctalk, all a patient
                    needs to know when going back to hospital is their phone
                    number while a doctor just needs the app and 2G internet.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                xs={12}
                md={4}
              >
                <Box maxWidth={500} width={1}>
                  <Box
                    component={"img"}
                    src={"/aboutus.svg"}
                    width={1}
                    height={1}
                    sx={{
                      filter:
                        theme.palette.mode === "dark"
                          ? "brightness(0.8)"
                          : "none",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <Box>
            <Grid container spacing={4} direction={isMd ? "row" : "column"}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent="center"
                xs={12}
                md={6}
              >
                <Box>
                  <Typography
                    variant={"h4"}
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Mission
                  </Typography>
                  <Typography
                    component={"p"}
                    color={"text.secondary"}
                    align="justify"
                  >
                    We aim to make medical records safe and digital. We want to
                    Doctors to be able to share and collaborate in order to give
                    best medical services. We arm rural doctors in particular
                    with information and tools so that the underserved
                    communities get the help they need and deserve.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                xs={12}
                md={6}
              >
                <Box>
                  <Typography
                    variant={"h4"}
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Clean and Modern Design:
                  </Typography>
                  <Typography
                    component={"p"}
                    color={"text.secondary"}
                    align="justify"
                  >
                    You are a Doctor in a ragtag health system. The resources
                    available to you has not increased relative to the
                    overwhelming number of your patients, case load, education
                    and research obligations. We have made Doctalk clean and
                    easy without sacrificing functionality. In fact, we
                    confidently claim to make your job easier, seamless, and
                    tidy. We respect your time. We care for your eyes. We are
                    not just another HIMS.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <Box>
            <Box marginBottom={4}>
              <Typography
                variant="h4"
                align={"center"}
                data-aos={"fade-up"}
                gutterBottom
                sx={{
                  fontWeight: 700,
                }}
              >
                FEATURES
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <ListItem
                    component="div"
                    disableGutters
                    data-aos={"fade-up"}
                    data-aos-delay={i * 100}
                    data-aos-offset={100}
                    data-aos-duration={600}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: 0,
                    }}
                  >
                    <Box
                      component={ListItemAvatar}
                      marginBottom={1}
                      minWidth={"auto !important"}
                    >
                      <Box color={theme.palette.primary.main}>{item.icon}</Box>
                    </Box>
                    <ListItemText
                      primary={item.title}
                      secondary={item.subtitle}
                      primaryTypographyProps={{
                        variant: "h6",
                        gutterBottom: true,
                        align: "left",
                      }}
                      secondaryTypographyProps={{ align: "left" }}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontWeight: 700,
                        },
                        margin: 0,
                      }}
                    />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default DocTalk;
