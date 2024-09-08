import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar, AppFooter, AppHeader } from "../components/index";

const DashboardPage = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DashboardPage;
