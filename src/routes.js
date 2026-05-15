import HomePage from "./pages/Home/index";
import BlogView from "./pages/BlogView/index";
import Blog from "./pages/Blog/index";
import MatchMaking from "./pages/Match-Making/index";
import VetsPage from "./pages/Vets/index";
import DayCare from "./pages/DayCare/index";
import MarketPlace from "./pages/MarketPlace/index";
import PrivacyPolicy from "./pages/PrivacyPolicy/index";
import NoInternetPage from "./pages/SinglePages/NoInternetPage";
import Terms from "./pages/Terms/index";
import Events from "./pages/Events/index";
import PortalBlogs from "./pages/Portal/PortalBlogs";
import PortalView from "./pages/PortalView/index";
import MyPetsPage from "./pages/MyPets/index";
import PetProfilePage from "./pages/PetProfile/index";
import AddPetCapture from "./pages/AddPetCapture/index";
import AddPetName from "./pages/AddPetName/index";
import AddPetProfile from "./pages/AddPetProfile/index";
import LostFoundPage from "./pages/LostFound/index";
import LostFoundReportPage from "./pages/LostFound/LostFoundReport";
import LostFoundDetailsPage from "./pages/LostFound/LostFoundDetails";
import LostFoundSightingPage from "./pages/LostFound/LostFoundSighting";
import LostFoundSightingDetailPage from "./pages/LostFound/LostFoundSightingDetailPage";
import LostFoundMatchRequestsHubPage from "./pages/LostFound/LostFoundMatchRequestsHub";
import LostFoundMatchChatStubPage from "./pages/LostFound/LostFoundMatchChatStub";
import MyBookingsPage from "./pages/MyBookings/index";
import BookingCheckoutPage from "./pages/BookingCheckout/index";
import VetBookingCheckoutPage from "./pages/VetBookingCheckout/index";
import PanelLogin from "./Panel/pages/Login";
import Register from "./Panel/pages/Register";
import Dashboard from "./Panel/pages/Dashboard";
import MasterTable from "./Panel/pages/MasterTable";
import DetailTable from "./Panel/pages/BookingTable";
import AllBookings from "./Panel/pages/AllBookings";
import EventView from "./pages/SinglePages/EventView";
import PortalEvents from "./pages/Portal/PortalEvents";
import ManageUser from "./Panel/pages/ManageUser";
import BookingTable from "./Panel/pages/BookingTable";
import DetailPage from "./Panel/pages/DetailPage";

export const routesConfig = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/blogs",
    Component: Blog,
  },
  {
    path: "/blogview",
    Component: BlogView,
  },
  {
    path: "/match-making",
    Component: MatchMaking,
  },
  {
    path: "/vets",
    Component: VetsPage,
  },
  {
    path: "/daycare",
    Component: DayCare,
  },
  {
    path: "/marketplace",
    Component: MarketPlace,
  },
  {
    path: "/privacy_policy",
    Component: PrivacyPolicy,
  },
  {
    path: "/no_internet",
    Component: NoInternetPage,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "events",
    Component: Events,
  },
  {
    path: "/my-pets",
    Component: MyPetsPage,
  },
  {
    path: "/my-bookings",
    Component: MyBookingsPage,
  },
  {
    path: "/pet/:petId",
    Component: PetProfilePage,
  },
  {
    path: "/add-pet/capture",
    Component: AddPetCapture,
  },
  {
    path: "/add-pet/name",
    Component: AddPetName,
  },
  {
    path: "/add-pet/profile",
    Component: AddPetProfile,
  },
  {
    path: "/lost-found",
    Component: LostFoundPage,
  },
  {
    path: "/lost-found/report",
    Component: LostFoundReportPage,
  },
  {
    path: "/lost-found/match-requests",
    Component: LostFoundMatchRequestsHubPage,
  },
  {
    path: "/lost-found/match-room/:roomId",
    Component: LostFoundMatchChatStubPage,
  },
  {
    path: "/lost-found/:reportId/sighting",
    Component: LostFoundSightingPage,
  },
  {
    path: "/lost-found/:uid/sightings/:sightingUid",
    Component: LostFoundSightingDetailPage,
  },
  {
    path: "/lost-found/:uid",
    Component: LostFoundDetailsPage,
  },
  {
    path: "/booking-checkout",
    Component: BookingCheckoutPage,
  },
  {
    path: "/vet-booking-checkout",
    Component: VetBookingCheckoutPage,
  },
  {
    path: "register",
    Component: Register,
  },
];

export const ProtectedRoutesConfig = [
  {
    access: "allow",
    path: "login",
    Component: PanelLogin,
  },
];

export const DashboardRoutesConfig = [
  {
    path: "nopage",
    Component: NoInternetPage,
  },
  {
    path: "/",
    Component: Dashboard,
  },
];

export const dashboardRoutesConfig = [
  {
    path: "/dashboard/",
    Component: Dashboard,
  },
  {
    path: "/dashboard/portal_blogs",
    Component: PortalBlogs,
  },
  {
    path: "/dashboard/portal_events",
    Component: PortalEvents,
  },
  {
    path: "/dashboard/all-vets",
    Component: () => {
      return <MasterTable type="vets" />;
    },
  },
  {
    path: "/dashboard/all-creche",
    Component: () => {
      return <MasterTable type="creche" />;
    },
  },
  {
    path: "/dashboard/all-serviceProviders",
    Component: () => {
      return <MasterTable type="serviceProviders" />;
    },
  },
  {
    path: "/dashboard/all-ngo",
    Component: () => {
      return <MasterTable type="ngo" />;
    },
  },
  {
    path: "/dashboard/all-user",
    Component: () => {
      return <MasterTable type="users" />;
    },
  },
  {
    path: "/dashboard/BookingTable",
    Component: BookingTable,
  },
  {
    path: "/dashboard/DetailPage",
    Component: DetailPage,
  },
  {
    path: "/dashboard/bookingDetail",
    Component: AllBookings,
  },
  {
    path: "/dashboard/manage_user",
    Component: ManageUser,
  },
  {
    path: "/dashboard/EventsView",
    Component: EventView,
  },
  {
    path: "/dashboard/BlogView",
    Component: PortalView,
  },
];
