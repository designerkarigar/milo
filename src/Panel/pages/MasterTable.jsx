import React, { useCallback, useEffect, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { CContainer } from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { getVets } from "../../utils/Functions/Vets/getVets";
import { vetColumn, chrecheColumn, usersColumn } from "./utils/Column.js";
import { userFilter, vetFilter, crecheFilter } from "./utils/Filters";
import { getCreches } from "../../utils/Functions/creche/getCreches";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../utils/Functions/Users/getAllUsers";

const MasterTable = (props) => {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        switch (props.type) {
          case "vets":
            setLoading(true);
            const vets = await getVets();
            setData(vets);
            setColumn(vetColumn);
            setFilter(vetFilter);
            setLoading(false);
            break;
          case "creche":
            setLoading(true);
            const creche = await getCreches();
            setData(creche);
            setColumn(chrecheColumn);
            setFilter(crecheFilter);
            setLoading(false);
            break;
          case "serviceProviders":
            break;
          case "ngo":
            break;
          case "users":
            setLoading(true);
            const user = await getAllUsers();
            setData(user);
            setColumn(usersColumn);
            setFilter(userFilter);
            setLoading(false);
            break;
          default:
            setLoading(true);
            const defaultvets = await getVets();
            setData(defaultvets);
            setColumn(vetColumn);
            setLoading(false);
            break;
        }
      } catch (err) {
        alert(err);
      }
    })();
  }, [props]);

  const onRowClick = useCallback((row, event) => {
    switch (props.type) {
      case "vets":
        navigate(`/dashboard/DetailPage?type=vets&uid=${row.data.uid}`);
        break;
      case "creche":
        navigate(`/dashboard/DetailPage?type=creches&uid=${row.data.uid}`);
        break;
      case "users":
        navigate(`/dashboard/manage_user?username=${row.data.userName}`);
        break;
      default:
        break;
    }
  }, []);
  const gridStyle = { minHeight: 450, minWidth: 700 };

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
          columns={column}
          dataSource={data}
          style={gridStyle}
          pagination="local"
          defaultLimit={10}
          onRowClick={onRowClick}
          defaultFilterValue={filter}
          enableColumnFilterContextMenu={true}
        ></ReactDataGrid>
      </div>
    );
  }
};

export default MasterTable;
