import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";


const navConfig = [
  {
    title: "Dashboard",
    path: "/admin/app",
    icon: <DashboardIcon />,
  },
  {
    title: "Doctor",
    path: "/admin/doctor",
    icon: <LocalHospitalIcon />,
  },
  {
    title: "BookingList",
    path: "/admin/booking",
    icon: <BookOnlineIcon />,
  },
];

export default navConfig;
