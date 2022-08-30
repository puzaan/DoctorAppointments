import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AdminViewDoctorSignup } from "../apigetway/actions/DoctorAction";
import Page from "../components/Page";
import DocSignupFileView from "./DocSignupFileView";

const SignupDoctorView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [fileType, setFileType] = useState("");

  const DoctorSignupView = useSelector((state) => state.DoctorSignupView);
  const { success, error, loading, doctorSignup } = DoctorSignupView;

  useEffect(() => {
    dispatch(AdminViewDoctorSignup(id));
    setFileType(doctorSignup.MBBSFile);
    // console.log(fileType);
    console.log(doctorSignup);
  }, [dispatch, id, doctorSignup.MBBSFile]);
  return (
    <Page title="Update Profile">
      <>
        <Box
          component={Card}
          variant={"outlined"}
          spacing={2}
          padding={2}
          margin={4}
          bgcolor={"transparent"}
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} spacing={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Full Name:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.fullName}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Address:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.address}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Email:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.email}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Contact Number:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.contactNumber}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Gender:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.gender}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Specialization:
                </Typography>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: "light", marginLeft: 1 }}
                >
                  {doctorSignup.specialization}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Specialization:
                </Typography>
                {doctorSignup.specializationKey.map((key, i) => (
                  <Typography
                    variant={"h5"}
                    sx={{ fontWeight: "light", marginLeft: 1 }}
                  >
                    {key}
                  </Typography>
                ))}
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
                  Institution:
                </Typography>
                {doctorSignup.institution.map((key) => (
                  <Typography
                    variant={"h5"}
                    sx={{ fontWeight: "light", marginLeft: 1 }}
                  >
                    {key}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Avatar
                alt={"fullName"}
                src={doctorSignup.photo}
                sx={{ width: 200, height: 200, marginBottom: 5 }}
                variant="square"
              />
            </Grid>
            <DocSignupFileView
              mbbs={doctorSignup.MBBSFile}
              name={doctorSignup.MBBS}
              fileType={fileType}
            />
          </Grid>
        </Box>
      </>
    </Page>
  );
};

export default SignupDoctorView;
