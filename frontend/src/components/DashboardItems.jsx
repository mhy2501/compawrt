import {
  faAmbulance,
  faClipboard,
  faDog,
  faHandHoldingDollar,
  faHandHoldingHand,
  faHome,
  faMobile,
  faPaw,
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
    url: "/dashboard/reportHistory",
    cName: "dashboard-links",
  },
  {
    title: "Saved History",
    icon: faClipboard,
    url: "/dashboard/savedHistory",
    cName: "dashboard-links",
  },
  {
    title: "Post a Pet",
    icon: faPaw,
    url: "/dashboard/postAPet",
    cName: "dashboard-links",
  },
  {
    title: "Posted Fur Babies",
    icon: faDog,
    url: "/dashboard/postedFurBabies",
    cName: "dashboard-links",
  }
];
