import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import Container from "../components/Container";
import FrontPageLayout from "../layouts/frontPage";
import Page from "../components/Page";
import DoctorCard from "../components/DoctorCard";
import { publicApprovedListDoctor } from "../apigetway/actions/DoctorAction";
import Loder from "./Loading";
import Error from "./Error";

export default function Specialists() {
  const dispatch = useDispatch();
  const DoctorApprovedList = useSelector((state) => state.DoctorApprovedList);
  const { loading, error, doctorApproved } = DoctorApprovedList;

  useEffect(() => {
    dispatch(publicApprovedListDoctor());
  }, [dispatch]);
  return (
    <Page title="Form">
      <Box>
        <FrontPageLayout />
        <Container>
          <Box>
            <Box sx={{ paddingTop: { xs: 3, sm: 1, lg: 0 } }} marginBottom={4}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "medium",
                }}
                gutterBottom
                color={"text.secondary"}
                align={"center"}
                fontWeight={700}
                variant={"h4"}
              >
                Our Specialists
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {loading ? (
                <Loder />
              ) : error ? (
                <Error>{error} </Error>
              ) : (
                <>
                  {doctorApproved.map((item, i) => (
                    <DoctorCard
                      name={item.fullName}
                      specialization={item.specialization}
                      photo={item.Photo}
                      mbbs={item.MBBS}
                      key={i}
                    />
                  ))}
                </>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
