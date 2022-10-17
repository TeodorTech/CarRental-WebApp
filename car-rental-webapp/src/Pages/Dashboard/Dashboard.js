import { useState, useEffect } from "react";
import axios from "axios";
import "../Dashboard/Dashboard-style.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [carsArray, setCarsArray] = useState();
  const [bookingArray, setBookingArray] = useState();
  useEffect(() => {
    getBookings();
    getCars();
  }, []);
  const navigate = useNavigate();
  async function getCars() {
    await axios
      .get("https://localhost:7286/api/car/getallcars")
      .then((response) => setCarsArray(response.data.length));
  }
  async function getBookings() {
    await axios
      .get("https://localhost:7286/api/booking")
      .then((response) => setBookingArray(response.data.length));
  }

  return (
    <>
      <h1>Welcome ADMIN !</h1>
      <div className="dash-flex">
        <div className="cars stats">
          <h2>CARS:</h2>
          <h3>{carsArray}</h3>
          <Button variant="outlined" onClick={() => navigate("/fleet")}>
            See More
          </Button>
        </div>
        <div className="book stats">
          <h2>BOOKINGS:</h2>
          <h3>{bookingArray}</h3>
          <Button variant="outlined" onClick={() => navigate("/myaccount")}>
            See More
          </Button>
        </div>
        <div className="users stats">
          <h2>USERS:</h2>
          <h3>4</h3>
          <Button variant="outlined">See More</Button>
        </div>
      </div>
    </>
  );
}
