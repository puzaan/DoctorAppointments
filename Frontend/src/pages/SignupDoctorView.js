import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { LoadingButton } from "@mui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  AdminApprovedDoctor,
  AdminViewDoctorSignup,
} from "../apigetway/actions/DoctorAction";
import Page from "../components/Page";
import DocSignupFileView from "./DocSignupFileView";
import Error from "./Error";
import Loder from "./Loading";

const SignupDoctorView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const approvedispatch = useDispatch();
  const navigate = useNavigate();

  const DoctorSignupView = useSelector((state) => state.DoctorSignupView);
  const { error, loading, doctorSignup } = DoctorSignupView;

  const DoctorApproved = useSelector((state) => state.DoctorApproved);
  const {
    success: approvedSuccess,
    error: approvedError,
    loading: approvedLoading,
  } = DoctorApproved;

  useEffect(() => {
    dispatch(AdminViewDoctorSignup(id));
    if (approvedSuccess) {
      navigate("/admin/signup/doctor/list");
    }
  }, [dispatch, id, doctorSignup.MBBSFile, approvedSuccess, navigate]);

  const approved = () => {
    approvedispatch(AdminApprovedDoctor(id));
  };
  return (
    <Page title="Approve Doctor">
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
            {loading ? (
              <Box display={"flex"} justifyContent={"center"}>
                <Loder />
              </Box>
            ) : error ? (
              <Error>{error} </Error>
            ) : (
              <>
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
                        key={i}
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
                    {doctorSignup.institution.map((key, i) => (
                      <Typography
                        key={i}
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
                    alt={doctorSignup.fullName}
                    src={doctorSignup.Photo}
                    variant="rounded"
                    sx={{ width: 200, height: 200, marginBottom: 5 }}
                  />
                </Grid>
                <DocSignupFileView
                  files={doctorSignup.MBBSFile}
                  name={doctorSignup.MBBS}
                  feildName={"MBBS: "}
                />
                <DocSignupFileView
                  files={doctorSignup.NmcFiles}
                  name={doctorSignup.NMC_number}
                  feildName={"NMC Number: "}
                />
                {doctorSignup.MD_MS !== "None" ? (
                  <DocSignupFileView
                    files={doctorSignup.MdMsFile}
                    name={doctorSignup.MdMsCollege}
                    feildName={doctorSignup.MD_MS}
                  />
                ) : null}
                {doctorSignup.DM_MCH !== "None" ? (
                  <DocSignupFileView
                    files={doctorSignup.DmMchFile}
                    name={doctorSignup.DmMchCollege}
                    feildName={doctorSignup.DM_MCH}
                  />
                ) : null}
                {!doctorSignup.Approped ? (
                  <Grid item xs={12} sm={12} md={12}>
                    <Box display={"flex"} justifyContent={"center"}>
                      <LoadingButton
                        loading={approvedLoading}
                        variant="contained"
                        startIcon={<HowToRegIcon />}
                        onClick={approved}
                      >
                        Approved
                      </LoadingButton>
                      {approvedError && <Error>{approvedError}</Error>}
                    </Box>
                  </Grid>
                ) : null}
              </>
            )}
          </Grid>
        </Box>
      </>
    </Page>
  );
};

export default SignupDoctorView;
