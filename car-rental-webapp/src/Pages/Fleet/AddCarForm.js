import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

export default function AddCarForm({ handleClose, getCars }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      make: "",
      model: "",
      color: "",
      year: "",
      pricePerDay: "",
    },
  });
  const [carAdded, setCarAdded] = useState(false);

  async function handleFormSubmit(data) {
    let uniqueId = uuidv4();
    handleSubmission(uniqueId, data.imageLink[0]);
    const dataToPost = {
      make: data.make,
      model: data.model,
      color: data.color,
      year: data.year,
      pricePerDay: data.pricePerDay,
      imageLink: `https://carsphotos.blob.core.windows.net/photos/${data.imageLink[0].name}_${uniqueId}`,
    };
    const response = await axios
      .post("https://localhost:7286/api/car", dataToPost)
      .then(() => {
        setCarAdded(true);
        setTimeout(() => {
          setCarAdded(false);
          getCars();
          handleClose();
        }, 2000);
      });
  }

  async function handleSubmission(id, selectedFile) {
    const formData = new FormData();
    formData.append("files", selectedFile);
    const response = await axios
      .post(`https://localhost:7286/api/File/UploadFile?id=${id}`, formData)
      .then((response) => {
        console.log(response.data);
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
        type="file"
        name="imageLink"
        accept=".jpg, .png"
        {...register("imageLink")}
      />

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
