import {
  faAmbulance,
  faClipboard,
  faHandHoldingDollar,
  faHandHoldingHand,
  faHome,
  faMobile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const DashboardItems = [
  {
    title: "Home",
    icon: faHome,
    url: "/",
    cName: "dashboard-links",
  },
  {
    title: "Profile",
    icon: faUser,
    url: "/dashboard/profile",
    cName: "dashboard-links",
  },
  {
    title: "Report Now",
    icon: faMobile,
    url: "/dashboard/report",
    cName: "dashboard-links",
  },
  {
    title: "Save Now",
    icon: faAmbulance,
    url: "/dashboard/saveMe",
    cName: "dashboard-links",
  },
  {
    title: "History",
    icon: faClipboard,
    url: "/dashboard/history",
    cName: "dashboard-links",
  },
];
