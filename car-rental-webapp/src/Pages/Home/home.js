import { useContext, useState } from "react";

import "./home-style.css";
import porche from "./../../assets/porche911.png";
import r8 from "./../../assets/r8.png";
import gwagon from "./../../assets/gWagon.jpg";
import { Link } from "react-router-dom";

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

  const { auth } = useContext(AuthContext);
  // function handleAuth() {
  //   const username = auth.authUserName;
  //   console.log(username);
  // }
console.log(auth)

  return (
    <div className="home-main">
      <div className="home-title">
        <div className="home-title-flex">
          <h3>Luxury Car Rental</h3>
          <h1> Start Driving Today</h1>
          <h3> Rent the best cars from us at the best prices on the market</h3>
          <div className="select-btn">
            {auth.authUserName ? (
              <h1>Welcome {auth.authUserName}!</h1>
            ) : (
              <Button variant="contained" size="large" onClick={handleOpen}>
                Signup
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
          <a href="#">
            <img className="featured-car" src={r8} />
          </a>
          <a href="#">
            <img className="featured-car" src={gwagon} />
          </a>
          <a href="#">
            <img className="featured-car" src={porche} />
          </a>
        </div>
      </div>
    </div>
  );
}
