import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import "../FilteredCarsPage/FilteredCars.css";

export default function FilteredCars(props) {
  const location = useLocation();
  const formData = location.state.filteredCars;
  console.log(formData);

  const filteredCar = formData.map((car) => (
    <div key={car.id} className="make">
      <div className="car-specs-flex">
        {car.make} {car.model} {car.year}
      </div>
      <img src={car.imageLink} />
      <div className="rent-container">
        <h3>
          {car.pricePerDay} $
          <br />
          Price/Day
        </h3>
        <Button variant="contained" size="medium">
          Rent Now
        </Button>
      </div>
    </div>
  ));
  return (
    <div className="fleet-container">
      <div className="makes-flex">{filteredCar}</div>
    </div>
  );
}
