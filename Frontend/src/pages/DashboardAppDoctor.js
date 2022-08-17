import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { AppWidgetSummary } from "../sections/@dashboard/app";

DashboardAppDoctor.propTypes = {
  docNo: PropTypes.any,
  path: PropTypes.string,
};

export default function DashboardAppDoctor({ docNo, path }) {
  const [doctorList, setDoctorList] = useState(0);
  useEffect(() => {
    setDoctorList(docNo.length);
  }, [docNo]);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary
        title="Doctor List"
        total={doctorList}
        color="info"
        icon={<LocalHospitalIcon />}
        path={path}
      />
    </Grid>
  );
}
