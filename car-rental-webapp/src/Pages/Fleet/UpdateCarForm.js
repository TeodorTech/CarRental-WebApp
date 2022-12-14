import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";

import axios from "axios";

export default function UpdateCarForm({ handleClose, getCars, updateCar }) {
  console.log(updateCar);
  const [update, setCar] = React.useState({
    make: updateCar.make,
    model: updateCar.model,
    color: updateCar.color,
    year: updateCar.year,
    pricePerDay: updateCar.pricePerDay,
    imageLink: updateCar.imageLink,
  });
  const [carUpdated, setCarUpdated] = useState(false);

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
      .put(`https://localhost:7286/api/car/${updateCar.id}`, update)
      .then(() => {
        setCarUpdated(true);
        setTimeout(() => {
          setCarUpdated(false);
          getCars();
          handleClose();
        }, 2000);
      });
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit}>
      {carUpdated && <Alert>Car updateted succesfuly</Alert>}
      <h1>Modify Car!</h1>
      <TextField
        label="Make"
        name="make"
        variant="filled"
        onChange={handleChange}
        value={update.make}
        required
      />
      <TextField
        label="Model"
        name="model"
        variant="filled"
        onChange={handleChange}
        value={update.model}
        required
      />
      <TextField
        label="Color"
        name="color"
        variant="filled"
        onChange={handleChange}
        value={update.color}
        required
      />
      <TextField
        label="Year"
        name="year"
        variant="filled"
        onChange={handleChange}
        value={update.year}
        required
      />
      <TextField
        label="PricePerDay"
        name="pricePerDay"
        variant="filled"
        onChange={handleChange}
        value={update.pricePerDay}
        required
      />
      <TextField
        label="Car Image"
        name="imageLink"
        variant="filled"
        onChange={handleChange}
        value={update.imageLink}
        required
      />

      {/* <TextField label="Password"name="password" variant="filled" type="password" required /> */}
      <div className="ButtonGroup">
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update car
        </Button>
      </div>
    </form>
  );
}
