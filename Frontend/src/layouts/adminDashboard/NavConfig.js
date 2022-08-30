import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";

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
    title: "Doctor Signup List",
    path: "/admin/signup/doctor/list",
    icon: <MedicationIcon />,
  },
  {
    title: "BookingList",
    path: "/admin/booking",
    icon: <BookOnlineIcon />,
  },
];

export default navConfig;
