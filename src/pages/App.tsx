import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../Panel/store";
import DashboardPage from "../Panel/pages/DashBoardPage";

const { Amplify, Auth } = require("aws-amplify");

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    Amplify.configure({
      aws_cognito_region: "us-east-2",
      aws_user_pools_id: "us-east-2_mX3IaDrPX",
      aws_user_pools_web_client_id: "3t99aksvkg6lnh8ltigqgrv0o7",
      aws_cognito_identity_pool_id:
        "us-east-2:77be6be8-d5cc-414b-a57f-b419704382ea",
      aws_mandatory_sign_in: "enable",
    });

    Auth.configure({
      authenticationFlowType: "USER_SRP_AUTH",
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
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
      </Provider>
    </>
  );
}

export default App;
