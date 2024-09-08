import React from "react";
import { CRow, CCol, CContainer } from "@coreui/react";

const Dashboard = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="text-center">
              <h1>Welcome to Admin Panel</h1>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Dashboard;
