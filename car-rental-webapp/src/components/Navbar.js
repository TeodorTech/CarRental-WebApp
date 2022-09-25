import React from "react";
import "./navbar-style.css";
import CarRentalIcon from "@mui/icons-material/CarRental";
import LoginIcon from "@mui/icons-material/Login";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <div className="nav-title">
          <CarRentalIcon fontSize="large" />
          <h1>Luxury Car Rental</h1>
        </div>
        <ul>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/fleet"
            >
              Fleet
            </Link>
          </li>
          <li>Contact </li>
          <li className="li-login">
            <LoginIcon
              fontSize="large"
              style={{ display: "inline", marginTop: "7px" }}
            />
            Log In
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
