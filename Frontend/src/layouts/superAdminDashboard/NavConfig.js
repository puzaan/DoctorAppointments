import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const navConfig = [
  {
    title: "dashboard",
    path: "/superadmin/app",
    icon: <DashboardIcon />,
    // icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Admin",
    path: "/superadmin/admin/list",
    icon: <AdminPanelSettingsIcon />,
    // icon: getIcon("eva:people-fill"),
  },
  {
    title: "Doctor",
    path: "/superadmin/doctor",
    icon: <LocalHospitalIcon />,
    // icon: getIcon("eva:people-fill"),
  },
  {
    title: "Booking List",
    path: "/superadmin/booking/list",
    icon: <BookOnlineIcon />,
    // icon: getIcon("eva:people-fill"),
  },
];

export default navConfig;
