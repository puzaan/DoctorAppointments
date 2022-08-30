// @mui

import { Container, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useResponsive from "../hooks/useResponsive";

// components
import Page from "../components/Page";
import Logo from "../components/Logo";
import { DoctorSingupForm } from "../sections/auth/DoctorSingupForm";
// sections
// ----------------------------------------------------------------------
const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  alignItems:"flex-start"
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));
export default function DoctorSignup() {
  const mdUp = useResponsive("up", "md");
  return (
    <Page title="DoctorSignup">
      <RootStyle>
        {mdUp && (
          <HeaderStyle>
            <Logo />
          </HeaderStyle>
        )}
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome To XYBA Health Management, Wellness Interaction. 
              <br />
              Fill up all form to be part of our team
            </Typography>
            <img
              src="/static/illustrations/illustration_register.png"
              alt="login"
            />
          </SectionStyle>
        )}
        <Container maxWidth="md">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Doctor Page.
            </Typography>
            <DoctorSingupForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
