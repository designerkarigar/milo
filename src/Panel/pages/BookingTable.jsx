import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { getAllBookings } from "../../utils/Functions/Bookings/getAllBookings";
import { bookingColumn } from "./utils/Column.js";
import { bookingFilter } from "./utils/Filters";
import { CContainer } from "@coreui/react";
import { FadeLoader } from "react-spinners";

const gridStyle = { minHeight: 450, minWidth: 700 };

const BookingTable = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const uid = queryParams.get("uid");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllBookings(type, uid);
        setData(res);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    })();
  }, [type]);

  const onRowClick = useCallback((row, event) => {
    navigate(`/dashboard/bookingDetail?type=${type}&uid=${row.data.uid}`);
  }, []);

  if (loading) {
    return (
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <FadeLoader color="#00a3da" />
      </CContainer>
    );
  } else {
    return (
      <div
        className="d-flex flex-column vh-100  container-fluid 
      overflow-auto
      "
        style={{ width: "100%" }}
      >
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          pagination="local"
          defaultLimit={10}
          columns={bookingColumn}
          dataSource={data}
          defaultFilterValue={bookingFilter}
          onRowClick={onRowClick}
        ></ReactDataGrid>
      </div>
    );
  }
};
export default BookingTable;
