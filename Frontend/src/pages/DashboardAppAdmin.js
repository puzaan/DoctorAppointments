import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AppWidgetSummary } from "../sections/@dashboard/app";

DashboardAppAdmin.propTypes = {
  adminNO: PropTypes.any,
  path: PropTypes.string,
};

export default function DashboardAppAdmin({ adminNO, path }) {
  const [adminList, setAdminList] = useState(0);
  useEffect(() => {
    setAdminList(adminNO.length);
  }, [adminNO]);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary
        title="Admin List"
        total={adminList}
        icon={<AdminPanelSettingsIcon />}
        path={path}
      />
    </Grid>
  );
}
