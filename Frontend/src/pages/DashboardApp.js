import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";

// sections
import { ListAdmins } from "../apigetway/actions/AdminAction";
import { ListDoctors } from "../apigetway/actions/DoctorAction";
import { ListBookings } from "../apigetway/actions/BookingAction";
import DashboardAppBooking from "./DashboardAppBooking";
import DashboardAppDoctor from "./DashboardAppDoctor";
import DashboardAppAdmin from "./DashboardAppAdmin";
import Loder from "./Loading";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [loadings, setLoading] = useState(true);
  const admindispatch = useDispatch();
  const docdispatch = useDispatch();
  const bookdispatch = useDispatch();
  const adminList = useSelector((state) => state.adminList);
  const { admins, loading } = adminList;
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading: docLoading } = doctorList;
  const bookingList = useSelector((state) => state.bookingList);
  const { bookings, loading: bookLoading } = bookingList;
  useEffect(() => {
    admindispatch(ListAdmins());
    docdispatch(ListDoctors());
    bookdispatch(ListBookings());
    if (!loading && !docLoading && !bookLoading) {
      setLoading(false);
    }
  }, [admindispatch, docdispatch, bookdispatch]);

  return (
    <Page title="Super Admin Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align={"center"}>
          Hi, Welcome back to Super Admin Dashboard
        </Typography>
        <Grid container spacing={3} justifyContent={"center"}>
          {loadings ? (
            <Loder />
          ) : (
            <>
              <DashboardAppAdmin
                adminNO={admins}
                path={"/superadmin/admin/list"}
              />
              <DashboardAppDoctor docNo={doctors} path={"/superadmin/doctor"} />
              <DashboardAppBooking
                bookNo={bookings}
                path={"/superadmin/booking/list"}
              />
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
