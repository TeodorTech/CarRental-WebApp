import React from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { TextField, Button } from "@mui/material";

import "./CarSelector.css";

export default function CarSelector() {
  const [formData, setFormData] = React.useState({
    make: "",
    color: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };
  console.log(formData);

  return (
    <div sx={{ minWidth: 120 }}>
      <FormControl className="carselector-box" fullWidth>
        <TextField
          id="select"
          label="Make"
          value={formData.make}
          name="make"
          onChange={handleChange}
          select
        >
          <MenuItem value={"Porsche"}>Porsche</MenuItem>
          <MenuItem value={"bmw"}>BMW</MenuItem>
          <MenuItem value={"Ferrari"}>Ferrari</MenuItem>
          <MenuItem value={"Mercedes"}>Mercedes</MenuItem>
        </TextField>

        <TextField
          id="select"
          label="Color"
          value={formData.color}
          name="color"
          onChange={handleChange}
          select
        >
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
        </TextField>
        <TextField
          name="price"
          value={formData.price}
          label="PricePerDay"
          variant="filled"
          onChange={handleChange}
        />
        <div className="select-btn">
          <Button variant="contained" size="large">
            Select Car
          </Button>
        </div>
      </FormControl>
    </div>
  );
}
