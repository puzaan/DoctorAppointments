// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// sections
import { AppCurrentVisits, AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }} align={'center'}>
          Hi, Welcome back to Super Admin Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Admin List" total={100} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doctor List" total={100} color="info" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Client List" total={150} color="warning" icon={'ant-design:android-filled'} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="All User "
              chartData={[
                { label: 'Doctor', value: 100 },
                { label: 'Admin', value: 90 },
                { label: 'Client', value: 10 },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.chart.blue[0], theme.palette.chart.violet[0]]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
