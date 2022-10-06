import { useContext, useState } from "react";
import "./navbar-style.css";
import CarRentalIcon from "@mui/icons-material/CarRental";

import { Outlet, Link } from "react-router-dom";
import LogInModalDialog from "./LogInModalDialog";
import LoginButtton from "./LoginButton";
import LoggedButton from "./LoggedButton";
import AuthContext from "../context/AuthProvider";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };
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
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/dash">
              DASHBOARD
            </Link>
          </li>
          <li>
            {auth.authUserName ? (
              <LoggedButton />
            ) : (
              <LoginButtton handleOpen={handleOpen} />
            )}
          </li>
          <LogInModalDialog open={open} handleClose={handleClose} />
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
