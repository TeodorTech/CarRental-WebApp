import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";

import axios from "axios";

export default function AddCarForm({ handleClose, getCars }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      make: "",
      model: "",
      color: "",
      year: "",
      pricePerDay: "",
      imageLink: "",
    },
  });
  const [carAdded, setCarAdded] = useState(false);

  async function handleFormSubmit(data) {
    const response = await axios
      .post("https://localhost:7286/api/car", data)
      .then(() => {
        setCarAdded(true);
        setTimeout(() => {
          setCarAdded(false);
          getCars();
          handleClose();
        }, 2000);
      });
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit(handleFormSubmit)}>
      {carAdded && <Alert>Car Added Succesfuly</Alert>}
      <h1>Register New Car Below!</h1>
      <TextField label="Make" {...register("make")} variant="filled" required />
      <TextField
        label="Model"
        {...register("model")}
        variant="filled"
        required
      />
      <TextField
        label="Color"
        {...register("color")}
        variant="filled"
        required
      />
      <TextField label="Year" {...register("year")} variant="filled" required />
      <TextField
        label="PricePerDay"
        {...register("pricePerDay")}
        variant="filled"
        required
      />
      <TextField
        label="Car Image"
        {...register("imageLink")}
        variant="filled"
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
