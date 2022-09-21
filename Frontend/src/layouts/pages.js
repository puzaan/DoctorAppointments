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
      icon: <FacebookIcon />,
      color: (theme) => theme.palette.primary.facebook,
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/channel/UCEZxPozsMFLcLhlmnhYGmSg/featured",
      icon: <YouTubeIcon />,
      color: (theme) => theme.palette.primary.youtube,
    },
    {
      title: "Tik-Tok",
      href: "https://www.tiktok.com/@xybahealth?is_from_webapp=1&sender_device=pc",
      icon: <FaTiktok />,
      color: (theme) => theme.palette.primary.viber,
    },
  ],
  contactUs: [
    {
      title: "Phone",
      href: "/",
      icon: <PhoneIcon  />,
      color: (theme) => theme.palette.primary.darker,
    },
    {
      title: "Email",
      href: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlKnfhbHZMDCtMLclrNWWvfffShLXfHrgXfpsLpZZjvdjhRnlZHbcDWbFFPlVcqwjTbkWL",
      icon: <EmailIcon />,
      color: (theme) => theme.palette.primary.youtube,
    },
    {
      title: "Viber",
      href: "/",
      icon: <FaViber />,
      color: (theme) => theme.palette.primary.viber,
    },
  ],
};

export default pages;
