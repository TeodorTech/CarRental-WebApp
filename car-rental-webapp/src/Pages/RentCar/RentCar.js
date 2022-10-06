import React from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./RentCar-style.css";
import { Alert, Button } from "@mui/material";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import axios from "axios";

export default function RentCar() {
  const location = useLocation();
  const carData = location.state.car;
  const [value, setValue] = React.useState(false);
  const [start, setStart] = React.useState(dayjs(Date.now()));
  const [end, setEnd] = React.useState(dayjs(Date.now()));
  const [payment, setPayment] = React.useState("card");
  const [isRent, setIsRent] = React.useState(false);
  const { auth } = useContext(AuthContext);
  const [bookDetails, setBookDetails] = React.useState({
    carId: carData.id,
    userId: auth.userId,
    startDate: "",
    endDate: "",
  });
  const totalDays = Math.floor((end - start) / (24 * 3600 * 1000));
  console.log(payment);
  async function handleClickRent() {
    const response = await axios
      .post("https://localhost:7286/api/booking", bookDetails)
      .then(setIsRent(true));
  }

  return (
    <>
      <div className="rentcar-grid">
        <div className="car-data">
          <h1 className="car-title">
            {carData.make} {carData.model} {carData.year}
          </h1>
          <img src={carData.imageLink} />
          {value && (
            <div className="payment-total">
              {isRent && <Alert> Car Rented Succesfully</Alert>}
              <div className="payment-total-flex">
                <h2>Payment Details :</h2>
                <p>
                  Car:
                  <b>
                    {carData.make} {carData.model}
                  </b>
                </p>
                <p>
                  Number of days: <b>{totalDays}</b>
                </p>
                <p>
                  Payment :<b> {payment.toUpperCase()}</b>
                </p>
                <h2>Total:{totalDays * carData.pricePerDay} $</h2>
                <Button variant="contained" onClick={handleClickRent}>
                  RENT NOW
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="date-picker">
          <h1>Booking Details:</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              name="startDate"
              label="Start Date"
              value={start}
              onChange={(newValue) => {
                setBookDetails((oldBook) => {
                  return {
                    ...oldBook,
                    // startDate: newValue,
                    startDate: dayjs(newValue).format("YYYY-MM-DD"),
                  };
                });
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <MobileDatePicker
              name="endDate"
              label="End Date"
              value={end}
              onChange={(newValue) => {
                setBookDetails((oldBook) => {
                  return {
                    ...oldBook,
                    // endDate: newValue,
                    endDate: dayjs(newValue).format("YYYY-MM-DD"),
                  };
                });
                setEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            id="select"
            label="Payment"
            value={payment}
            name="payment"
            onChange={(event) => {
              setPayment(event.target.value);
            }}
            select
          >
            <MenuItem value={"card"}>Card</MenuItem>
            <MenuItem value={"cash"}>Cash</MenuItem>
            <MenuItem value={"crypto"}>Crypto</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="warning"
            onClick={() => setValue(true)}
            // onClick={handleClickRent}
          >
            CALCULATE
          </Button>
        </div>
      </div>
    </>
  );
}
