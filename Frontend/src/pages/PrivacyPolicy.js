import {
  Avatar,
  Box,
  Grid,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import Page from "../components/Page";
import { Main } from "../layouts/Main";
import Container from "../components/Container";

export const PrivacyPolicy = () => (
  <Page title="Privacy Policy">
    <Main />
    <Container>
      <Box boxShadow={4} borderRadius={2}>
        <Box bgcolor={"#377dff"} borderRadius={2}>
          <Container paddingX={{ xs: 2, sm: 4 }}>
            <Typography
              variant={"h6"}
              component={"p"}
              align="justify"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#fff",
              }}
            >
              The following paragraphs explain how your personal data will be
              treated. This policy may be updated from time to time.
              <br />
              <br />
              Your privacy is very important to us.We are constantly making
              effort to safeguard and protect your privacy. This section on
              &quot;Privacy Policy&quot; contains details on issues related to
              your privacy when using our services. It is intended to inform you
              of our policies, procedures and practices regarding the
              collection, use and disclosure of any information that you provide
              through Xyba Health Technologies’ Doctalk platform.
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: "#fff",
              }}
            >
              Last modified on <strong>20 Sep, 2022</strong>
            </Typography>
          </Container>
          <Box
            component={"svg"}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            width={1}
            marginBottom={-1}
          >
            <path
              fill={"#ffffff"}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            />
          </Box>
        </Box>
        <Container
          paddingTop={"0 !important"}
          paddingX={{ xs: 2, sm: 4 }}
          position={"relative"}
          top={0}
        >
          <Box
            component={Grid}
            container
            spacing={4}
            flexDirection={{ xs: "row", md: "row" }}
          >
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Typography variant={"h5"} fontWeight={700} gutterBottom>
                  Confidentiality
                </Typography>
                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                  <Grid item xs={12}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          // bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={
                          "Protecting your personal information is top priority for us. We will not provide your personal information to other healthcare professionals and/or organisations without your consent, except when required by the law."
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          // bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={
                          "It is possible that, at any time, we may be requested by relevant govenrnment authorities to provide them with access to documents held by Xyba Health, or to attend interviews with them in connection with the work we do. In the unlikely event that such a situation arises, we shall comply with the request only to the extent that we are bound by law to do so and, insofar as it is practicable or permitted under the relevant law, shall notify you of the request or the sharing of information. As part of our service to you, we will do our best to protect your interests in those circumstances."
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          // bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={
                          "Where you provide us with any personal data of third parties, you confirm that you have obtained all necessary consents to do so, and that we may collect, use and disclose such personal data for the purposes set out above, in accordance with the Personal Data Protection Acts like Privacy Act of Nepal 2018, Health Information and Privacy Act and Public Health Service Act of Nepal 2018."
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          // bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={
                          "By providing your personal data to us, you hereby consent to the collection, use, storage, and disclosure of personal data belonging to you, or that may relate to a third-party individual that is provided by you, during your use of the Xyba Health Technology’s Products and Services including but not limited to Doctalk.``Such data shall not be shared with any third party except when required by law. We may use this data to"
                        }
                      />
                    </Box>
                    <Box marginLeft={4}>
                      <Typography component={"p"}>
                        Such data shall not be shared with any third party
                        except when required by law. We may use this data to
                      </Typography>
                      {[
                        "(a) To provide you with better services.",
                        "(b) To improve the delivery and ensure continuity in the provision of services.",
                        "(c) To serve you in the most efficient and effective way;",
                        "(d) For data analysis, evaluation, and policy-making relating to online medical appointments, consultation and record keeping. unless such use or sharing is prohibited by law.",
                      ].map((item, i) => (
                        <Typography component={"p"} key={i}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          // bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText
                        primary={
                          "To ensure quality services, our healthcare providers receive regular clinical input. We may keep transcripts of online chat and counselling sessions for supervision and training purposes. We will not disclose your identity in those transcripts to protect your identity"
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Typography variant={"h5"} fontWeight={700} gutterBottom>
                  What information will we collect
                </Typography>
                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                  {[
                    "We have the ethical duty to protect the safety and wellbeing of our clients. In order for us to meet your needs on our online consultation platform and our digital health record platforms and to ensure your safety, we may have to collect personal identifiable information such as, but not limited to, your name, phone number, your email address, your address and log data (your computer Internet Protocol address “IP”).",
                    "For the purpose of evaluating the effectiveness of our services, we will collect some personal information about you such as your demographic details, your feedback about this service, information on pages that you visit on our platform, duration that you spend on the platform, the number of exchanges, and any information that you share with us over the platform. However, you will not be identifiable in any of our data reporting and evaluation process.",
                    "You have the right to terminate our service at any time. However, we will reserve the rights to retain the information you have provided to us during period of use of our services. The privacy policy will still apply even if you terminate your account with us.",
                  ].map((item, i) => (
                    <Grid item xs={12} key={i}>
                      <Box
                        component={ListItem}
                        disableGutters
                        width={"auto"}
                        padding={0}
                      >
                        <Box
                          component={ListItemAvatar}
                          minWidth={"auto !important"}
                          marginRight={2}
                        >
                          <Box
                            component={Avatar}
                            // bgcolor={theme.palette.secondary.main}
                            width={20}
                            height={20}
                          >
                            <svg
                              width={12}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Box>
                        </Box>
                        <ListItemText primary={item} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Typography variant={"h5"} fontWeight={700} gutterBottom>
                  How your information will be stored:
                </Typography>
                <Typography component={"p"}>
                  To safeguard your personal data, all electronic storage and
                  transmission of personal data are secured with appropriate
                  security technologies and comply with the highest data
                  protection standards.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Typography variant={"h5"} fontWeight={700} gutterBottom>
                  How long will we keep the information about you:
                </Typography>
                <Typography component={"p"}>
                  Any of the information that we hold about you described above,
                  will be held for up to one (1) year from the initial point of
                  contact, whether you decide to use our services or not.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Typography variant={"h5"} fontWeight={700} gutterBottom>
                  Complaints
                </Typography>
                <Typography component={"p"}>
                  If you are unsatisfied with our service, you may write to
                  <Link component="button" variant="body2">
                    {" info@xyba.health"}
                  </Link>
                  . Our team will look into the complaint and get back to you
                  within 3 working days.
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Container>
  </Page>
);
