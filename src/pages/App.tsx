import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import "../theme/css-variables.css";
import "../theme/styles.css";
import "../Panel/scss/style.scss";
import {
  routesConfig,
  ProtectedRoutesConfig,
  dashboardRoutesConfig,
} from "../routes";
import ProtectedRoute from "../components/ProtectedRoutes";
import { PageNotFound } from "./SinglePages/PageNotFound";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../Panel/store";
import DashboardPage from "../Panel/pages/DashBoardPage";
import { AuthProvider } from "../contexts/AuthContext";
import HeartBalloons from "../components/HeartBalloons/index";
import FloatingQuickActions from "../components/FloatingQuickActions/FloatingQuickActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Amplify, Auth } = require("aws-amplify");

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function HeartBalloonsWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  
  if (!isHomePage) return null;
  
  return <HeartBalloons />;
}

function FloatingQuickActionsWrapper() {
  const location = useLocation();
  if (location.pathname.startsWith("/dashboard")) return null;
  return <FloatingQuickActions />;
}

function App() {
  useEffect(() => {
    Amplify.configure({
      aws_cognito_region: "ap-south-1",
      aws_user_pools_id: "ap-south-1_HSc9Q5dtl",
      aws_user_pools_web_client_id: "1jq2ul996k93nf7rru4rm2dna2",
      aws_cognito_identity_pool_id:
        "ap-south-1:72ec174e-a45c-4509-afdb-875da18c9231",
      aws_mandatory_sign_in: "enable",
    });

    Auth.configure({
      authenticationFlowType: "USER_SRP_AUTH",
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3800}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <HeartBalloonsWrapper />
            <FloatingQuickActionsWrapper />
            <Routes>
            {routesConfig.map((route) => {
              const { path, Component } = route;
              return (
                <Route key={path} path={path} element={<Component />}></Route>
              );
            })}
            {ProtectedRoutesConfig.map((route) => {
              const { path, Component, access } = route;
              return (
                <Route
                  path={path}
                  key={path}
                  element={
                    <ProtectedRoute
                      component={Component}
                      redirectLink={"/login"}
                      path={path}
                      access={access}
                    ></ProtectedRoute>
                  }
                ></Route>
              );
            })}

            <Route path="*" element={<PageNotFound />}></Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  component={DashboardPage}
                  redirectLink={"/login"}
                  path={"/dashboard"}
                  access={"notAllow"}
                ></ProtectedRoute>
              }
            >
              {dashboardRoutesConfig.map((route) => {
                const { path, Component } = route;
                return (
                  <Route key={path} path={path} element={<Component />}></Route>
                );
              })}
            </Route>
          </Routes>
        </Router>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
