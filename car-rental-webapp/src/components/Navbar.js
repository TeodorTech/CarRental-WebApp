import React from "react";
import "./navbar-style.css";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
          <li>Contact</li>
        </ul>
        <div className="nav-login">
          <h1>Login</h1>
          <AccountCircleIcon fontSize="large" />
        </div>
      </nav>

      <Outlet />
    </>
  );
}
