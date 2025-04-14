import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Navbar = ({ mode, toggleMode }) => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const labelTextColor = mode === "dark" ? "text-light" : "text-dark";
  const btnColor = mode === "dark" ? "btn-success" : "btn-primary";

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        mode === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          <div className={`form-check form-switch me-3 ${labelTextColor}`}>
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={toggleMode}
              checked={mode === "dark"}
              style={{ cursor: "pointer",
                backgroundColor: mode === "dark" ? "green" : "",
                borderColor: mode === "dark" ? "green" : "",
              }}
            />
            <label
              className={`form-check-label ${labelTextColor}`}
              htmlFor="flexSwitchCheckDefault"
            >
              {mode === "dark" ? "Dark Mode" : "Light Mode"}
            </label>
          </div>

          {!Cookies.get("token") ? (
            <form className="d-flex">
              <Link className={`btn ${btnColor} mx-1`} to="/login" role="button">
                Login
              </Link>
              <Link className={`btn ${btnColor} mx-1`} to="/signup" role="button">
                SignUp
              </Link>
            </form>
          ) : (
            <button className={`btn ${btnColor}`} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
