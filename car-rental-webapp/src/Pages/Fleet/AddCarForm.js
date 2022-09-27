import React from "react";
import { TextField, Button } from "@mui/material";

import axios from "axios";

export default function AddCarForm({ handleClose, getCars }) {
  const [car, setCar] = React.useState({
    make: "",
    model: "",
    color: "",
    year: "",
    pricePerDay: "",
    imageLink: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCar((oldCar) => {
      return {
        ...oldCar,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("https://localhost:7286/api/car", car)
      .then(alert("Car added succesfuly"));
    getCars();
    handleClose();
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit}>
      <h1>Register New Car Below!</h1>
      <TextField
        label="Make"
        name="make"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Model"
        name="model"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Color"
        name="color"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Year"
        name="year"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="PricePerDay"
        name="pricePerDay"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Car Image"
        name="imageLink"
        variant="filled"
        onChange={handleChange}
        required
      />

      {/* <TextField label="Password"name="password" variant="filled" type="password" required /> */}
      <div className="ButtonGroup">
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Add Car
        </Button>
      </div>
    </form>
  );
}
