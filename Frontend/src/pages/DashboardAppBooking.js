import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

import PropTypes from "prop-types";
import { AppWidgetSummary } from "../sections/@dashboard/app";

DashboardAppBooking.propTypes = {
  bookNo: PropTypes.any,
  path: PropTypes.string,
};

export default function DashboardAppBooking({ bookNo, path }) {
  const [booingList, setBookingList] = useState(0);
  useEffect(() => {
    setBookingList(bookNo.length);
  }, [bookNo]);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <AppWidgetSummary
        title="Client List"
        total={booingList}
        color="warning"
        icon={<BookOnlineIcon />}
        path={path}
      />
    </Grid>
  );
}
