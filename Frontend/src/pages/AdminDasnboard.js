// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function AdminDashboard() {
  
  return (
    <Page title="AdminDashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align={'center'}>
          Hi, Welcome back to Admin Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Doctor List" total={100} color="info" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Client List" total={150} color="warning" icon={'ant-design:android-filled'} />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current User"
              chartData={[
                { label: 'Doctor', value: 4344 },
                { label: 'Admin', value: 5435 },
                { label: 'Client', value: 1443 },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.chart.blue[0], theme.palette.chart.violet[0]]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
