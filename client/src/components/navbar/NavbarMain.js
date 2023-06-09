import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import "./NavbarMain.css";
import { Link } from "react-router-dom";

function NavbarMain() {
  const [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);

  return (
    <Navbar bg="light" expand="lg" className="p-0 hello navbar-main"
    style={{
      backgroundImage: "linear-gradient(to right, #55efc4, #00b894)"
    }}
    >
      <div className="container-fluid mx-3">
        <div>
          <Link className="nav-link" to="/">
            <img
              src="https://cdn4.iconfinder.com/data/icons/startup-27/64/human-resources-interview-people-512.png"
              width="55px"
              height="55px"
              alt="Logo"
            />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <ul className="navbar-nav nav-tabs ms-auto text-decoration-none">
              <li className="nav-item active">
                <Link
                  className="nav-link"
                  style={{ padding: "1.3rem" }}
                  to="/"
                >
                  Home
                </Link>
              </li>

              {!userLoginStatus ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    style={{ padding: "1.3rem" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    style={{ padding: "1.3rem" }}
                    to="/login"
                    onClick={logoutUser}
                  >
                    LogOut
                  </Link>
                </li>
              )}

              {userLoginStatus && role === "admin" && (
                <React.Fragment>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      style={{ padding: "1.3rem" }}
                      to="/add-user"
                    >
                      Add Employees
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      style={{ padding: "1.3rem" }}
                      to="/users"
                    >
                      Employees
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      style={{ padding: "1.3rem" }}
                      to="/removed-users"
                    >
                      Removed Employees
                    </Link>
                  </li>
                </React.Fragment>
              )}

              {userLoginStatus && role !== "admin" && (
                <React.Fragment>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      style={{ padding: "1.3rem" }}
                      to="/emp-dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMain;
