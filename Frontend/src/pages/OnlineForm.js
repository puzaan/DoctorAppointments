/*eslint-disable */
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Page from "../components/Page";
import Container from "../components/Container";
import { Form } from "../components/Form";
import { Main } from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { publicApprovedListDoctor } from "../apigetway/actions/DoctorAction";

const OnlineForm = () => {
  const dispatch = useDispatch();
  const DoctorApprovedList = useSelector((state) => state.DoctorApprovedList);
  const { loading, error, doctorApproved } = DoctorApprovedList;

  useEffect(() => {
    dispatch(publicApprovedListDoctor());
  }, [dispatch]);

  return (
    <Page title="Online Consultation Form">
      <Main />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <Form data={doctorApproved} />
        </Container>
      </LocalizationProvider>
    </Page>
  );
};

export default OnlineForm;
