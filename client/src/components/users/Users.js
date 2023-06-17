import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { taskContext } from "../../context/TaskContextProvider";

const Users = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem("token");
  const [tasks, setTasks] = useContext(taskContext);
  const navigate = useNavigate();

  const getUsers = () => {
    axios
      .get("http://localhost:5000/user-api/get-users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.payload);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const deleteUser = (user) => {
    axios
      .delete(`http://localhost:5000/user-api/delete-user/${user.username}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          getUsers();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setTasks(user);
    navigate("/user-details");
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 260 },
    { field: "phone", headerName: "Contact Number", width: 180 },
    { field: "department", headerName: "Department", width: 180 },
    { field: "jod", headerName: "Joining Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            onClick={() => deleteUser(params.row)}
            className="btn-remove"
          >
            Remove
          </Button>
          
        </div>
      ),
    },
    {
      field: "details",
      headerName: "More",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => showUserDetails(params.row)}
          className="btn-details"
        >
          Details
        </Button>
      ),
    },
  ];

  const getRowClassName = (params) => {
    if (params.rowIndex === 0) {
      return "header-row";
    }
    return "";
  };

  return (
    <div className="users">
      {error && <p className="error-message">{error}</p>}
      <div className="table-container">
        <h1 className="table-heading">Employees</h1>
        <div style={{ height: 500, width: "100%" }}>
        <DataGrid
  rows={users.map((user, index) => ({ id: index + 1, ...user }))}
  columns={columns}
  pageSize={10}
  getRowClassName={(params) =>
    params.rowIndex === 0 ? 'header-row' : ''
  }
/>

        </div>
      </div>
    </div>
  );
};

export default Users;
