import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GavelIcon from "@mui/icons-material/Gavel";

const navConfig = [
  {
    title: "About Us",
    path: "/",
    icon: <InfoIcon />,
  },
  {
    title: "Our Specialists",
    path: "/speccialist",
    icon: <AssignmentIndIcon />,
  },
  // {
  //   title: "Our Health Tech",
  //   path: "/",
  //   icon: <LocalHospitalIcon />,
  // },
  {
    title: "Our Partner Clinics",
    path: "/",
    icon: <LocalHospitalIcon />,
  },
  {
    title: "Privacy Policy",
    path: "/privacypolicy",
    icon: <GavelIcon />,
  },
];

export default navConfig;
