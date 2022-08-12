// @mui
import { Grid, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Page from "../components/Page";
// sections
import { AdminListDoctors } from "../apigetway/actions/DoctorAction";
import { AdminListBookings } from "../apigetway/actions/BookingAction";
import Loder from "./Loading";
import DashboardAppDoctor from "./DashboardAppDoctor";
import DashboardAppBooking from "./DashboardAppBooking";

// ----------------------------------------------------------------------

export default function AdminDashboard() {
  const [loadings, setLoading] = useState(true);
  const docdispatch = useDispatch();
  const bookdispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading: docLoading } = doctorList;
  const bookingList = useSelector((state) => state.bookingList);
  const { bookings, loading: bookLoading } = bookingList;
  useEffect(() => {
    docdispatch(AdminListDoctors());
    bookdispatch(AdminListBookings());
    if (!docLoading && !bookLoading) {
      setLoading(false);
    }
  }, [docdispatch, bookdispatch]);
  return (
    <Page title="AdminDashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align={"center"}>
          Hi, Welcome back to Admin Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent={"center"}>
          {loadings ? (
            <Loder />
          ) : (
            <>
              <DashboardAppDoctor docNo={doctors} path={"/admin/doctor"} />
              <DashboardAppBooking bookNo={bookings} path={"/admin/booking"} />
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
