import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FaTiktok, FaViber } from "react-icons/fa";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const pages = {
  healthTech: [
    {
      title: "DocTalk",
      href: "/doctalk",
    },
    {
      title: "Buzzer",
      href: "/",
    },
  ],
  SocialMedia: [
    {
      title: "Facebook",
      href: "https://www.facebook.com/Xyba-Health-106379275529379",
      icon: <FacebookIcon color="primary" />,
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/channel/UCEZxPozsMFLcLhlmnhYGmSg/featured",
      icon: <YouTubeIcon color="primary" />,
    },
    {
      title: "Tik-Tok",
      href: "https://www.tiktok.com/@xybahealth?is_from_webapp=1&sender_device=pc",
      icon: <FaTiktok color="primary" />,
    },
  ],
  contactUs: [
    {
      title: "Phone",
      href: "/",
      icon: <PhoneIcon color="primary" />,
    },
    {
      title: "Email",
      href: "/",
      icon: <EmailIcon color="primary" />,
    },
    {
      title: "Viber",
      href: "/",
      icon: <FaViber color="primary" />,
    },
  ],
};

export default pages;
