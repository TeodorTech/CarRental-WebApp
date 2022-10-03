import React from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./RentCar-style.css";
import { Button } from "@mui/material";

export default function RentCar() {
  const location = useLocation();
  const carData = location.state.car;
  const [value, setValue] = React.useState(false);
  const [startDate, setStartDate] = React.useState(dayjs(Date.now()));
  const [endDate, setEndDate] = React.useState(dayjs(Date.now()));

  const totalDays = Math.floor((endDate - startDate) / (24 * 3600 * 1000));

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
              <div className="payment-total-flex">
                <h2>Payment Details :</h2>
                <p>
                  Car:{carData.make}
                  {carData.model}
                </p>
                <p>
                  Number of days:
                  {totalDays}
                </p>
                <h2>Total:{totalDays * carData.pricePerDay} $</h2>
                <Button variant="contained">RENT NOW</Button>
              </div>
            </div>
          )}
        </div>
        <div className="date-picker">
          <h1>Booking Details:</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <MobileDatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setValue(true)}
          >
            CALCULATE
          </Button>
        </div>
      </div>
    </>
  );
}
