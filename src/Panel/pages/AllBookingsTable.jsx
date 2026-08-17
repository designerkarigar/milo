import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { CButton, CContainer } from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { getAllBookingsPaginated } from "../../utils/Functions/Bookings/getAllBookings";
import { allBookingColumn } from "./utils/Column.js";
import { allBookingFilter } from "./utils/Filters";

const PAGE_SIZE = 50;
const gridStyle = { minHeight: 450, minWidth: 700 };

const AllBookingsTable = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllBookingsPaginated(pageNo, PAGE_SIZE);
        setData(res);
        setHasMore(res.length === PAGE_SIZE);
        setInitialLoad(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setInitialLoad(false);
        alert(err);
      }
    })();
  }, [pageNo]);

  const onRowClick = useCallback((row) => {
    const type = row.data.serviceType;
    if (!type) {
      alert("This booking has no service type, so its details cannot be opened.");
      return;
    }
    navigate(`/dashboard/bookingDetail?type=${type}&uid=${row.data.uid}`);
  }, [navigate]);

  if (initialLoad) {
    return (
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <FadeLoader color="#00a3da" />
      </CContainer>
    );
  }

  return (
    <div
      className="d-flex flex-column vh-100 container-fluid overflow-auto"
      style={{ width: "100%" }}
    >
      <div className="d-flex justify-content-between align-items-center py-2">
        <h5 className="mb-0">All Bookings</h5>
        <div className="d-flex align-items-center gap-2">
          <CButton
            color="primary"
            variant="outline"
            disabled={pageNo === 0 || loading}
            onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </CButton>
          <span>Page {pageNo + 1}</span>
          <CButton
            color="primary"
            variant="outline"
            disabled={!hasMore || loading}
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            Next
          </CButton>
        </div>
      </div>
      <ReactDataGrid
        idProperty="uid"
        style={gridStyle}
        pagination={false}
        columns={allBookingColumn}
        dataSource={data}
        defaultFilterValue={allBookingFilter}
        onRowClick={onRowClick}
        loading={loading}
      />
    </div>
  );
};

export default AllBookingsTable;
