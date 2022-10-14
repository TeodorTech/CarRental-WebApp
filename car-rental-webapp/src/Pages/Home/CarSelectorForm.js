import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import "./CarSelector.css";

export default function CarSelector() {
  const [formData, setFormData] = useState({
    make: "",
    color: "",
    price: "",
  });
  const [filteredCars, setFilteredCars] = useState({
    make: "",
    model: "",
    color: "",
    year: "",
    pricePerDay: "",
    imageLink: "",
  });

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  async function SelectCars(formData) {
    const response = await axios
      .get(
        `https://localhost:7286/api/car/carselector?make=${formData.make}&price=${formData.price}&color=${formData.color}`
      )
      .then((response) => setFilteredCars(response.data))
      .then(setRedirect(true));
    // .then((response) => console.log(response.data));
  }

  return (
    <div sx={{ minWidth: 120 }}>
      <FormControl className="carselector-box" fullWidth>
        <p>
          <b>Describe the perfect car!</b>
        </p>
        <TextField
          className="textfield"
          id="select"
          label="Make"
          value={formData.make}
          name="make"
          onChange={handleChange}
          select
        >
          <MenuItem value={"ferrari"}>Ferrari</MenuItem>
          <MenuItem value={"bmw"}>BMW</MenuItem>
          <MenuItem value={"porsche"}>Porsche</MenuItem>
        </TextField>

        <TextField
          className="textfield"
          id="select"
          label="Color"
          value={formData.color}
          name="color"
          onChange={handleChange}
          select
        >
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
        </TextField>
        <TextField
          className="textfield"
          name="price"
          value={formData.price}
          label="PricePerDay"
          variant="filled"
          onChange={handleChange}
        />
        <div className="select-btn">
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              SelectCars(formData);
              if (redirect) {
                navigate("filteredcars", { state: { filteredCars } });
              }
            }}
          >
            Select Car
          </Button>
        </div>
      </FormControl>
    </div>
  );
}
