import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import RentCarForm from "./RentCarForm";
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
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = React.useState({
    carId: carData.id,
    userId: auth.userId,
    startDate: "",
    endDate: "",
  });
  const totalDays = Math.floor((end - start) / (24 * 3600 * 1000));

  function handleClickRent() {
    // const response = await axios
    //   .post("https://localhost:7286/api/booking", bookDetails)
    //   .then(setIsRent(true));
    setIsRent(true);
    setTimeout(() => {
      setIsRent(false);
      navigate("myaccount");
    }, 3000);
  }

  return (
    <>
      <div className="rentcar-grid">
        <div className="car-data">
          <h1 className="car-title">
            {carData.make} {carData.model} {carData.year}
          </h1>
          <img src={carData.imageLink} />
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
        {value && (
          <RentCarForm
            userName={auth.authUserName}
            car={carData.make}
            period={bookDetails.startDate}
            days={totalDays}
            paymentType={payment}
            total={totalDays * carData.pricePerDay}
            handleClickRent={handleClickRent}
            isRent={isRent}
          />
        )}
      </div>
    </>
  );
}
