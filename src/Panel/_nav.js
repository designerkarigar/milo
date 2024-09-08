import React from "react";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import {
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilCat,
  cilChildFriendly,
  cilBusAlt,
  cilUser,
} from "@coreui/icons";

export const getNavConfig = (role) => {
  const nav = [
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: "Bookings",
    },
    {
      component: CNavItem,
      name: "Creche Bookings",
      to: "/dashboard/BookingTable?type=creche",
      icon: <CIcon icon={cilCat} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Vet Bookings",
      to: "/dashboard/BookingTable?type=vets",
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
  ];

  const master_nav = [
    {
      component: CNavItem,
      name: "Dashboard",
      to: "/dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: "Master Controls",
    },
    {
      component: CNavItem,
      name: "Vets",
      to: "/dashboard/all-vets",
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Creches",
      to: "/dashboard/all-creche",
      icon: <CIcon icon={cilChildFriendly} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "Service Provides",
      to: "/dashboard/all-serviceProviders",
      icon: <CIcon icon={cilBusAlt} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "NGO",
      to: "/dashboard/all-ngo",
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: "User",
      to: "/dashboard/all-user",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },

    {
      component: CNavGroup,
      name: "Site Controls",
      to: "/base",
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "Blogs",
          to: "/dashboard/portal_blogs",
        },
        {
          component: CNavItem,
          name: "Events",
          to: "/dashboard/portal_events",
        },
      ],
    },
  ];
  if (role === "admin") {
    return master_nav;
  } else {
    return nav;
  }
};

export default getNavConfig;
