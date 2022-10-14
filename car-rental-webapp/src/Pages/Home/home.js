import { useContext, useState, useEffect } from "react";

import "./home-style.css";
import porche from "./../../assets/porche911.png";
import r8 from "./../../assets/r8.png";
import gwagon from "./../../assets/gWagon.jpg";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ModalDialog from "./ModalDialog";
import CarSelector from "./CarSelectorForm";

import AuthContext from "../../context/AuthProvider";

export default function Home() {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  // function handleAuth() {
  //   const username = auth.authUserName;
  //   console.log(username);
  // }

  return (
    <div className="home-main">
      <div className="home-title">
        <div className="home-title-flex">
          <p>
            <b>Start Driving Today!</b>
          </p>
          <p>LUXURY CAR RENTAL</p>
          <p> Rent the best cars from us at the best prices on the market.</p>
          <div className="select-btn">
            {auth.authUserName ? (
              <h1>Welcome {auth.authUserName}!</h1>
            ) : (
              <Button variant="contained" size="large" onClick={handleOpen}>
                Create Account
              </Button>
            )}
            <ModalDialog open={open} handleClose={handleClose} />
          </div>
        </div>
      </div>
      <CarSelector />
      <div className="home-featuredcars">
        <div className="featuredcars-title">
          <h1>Featured Cars</h1>
        </div>
        <div className="featuredcars-flex">
          <a href="fleet">
            <img className="featured-car" src={r8} />
          </a>
          <a href="fleet">
            <img className="featured-car" src={gwagon} />
          </a>
          <a href="fleet">
            <img className="featured-car" src={porche} />
          </a>
        </div>
        <p>For More Luxury Cars Go To Fleet!</p>
        <Button onClick={() => navigate("fleet")}>More Cars</Button>
      </div>
    </div>
  );
}
