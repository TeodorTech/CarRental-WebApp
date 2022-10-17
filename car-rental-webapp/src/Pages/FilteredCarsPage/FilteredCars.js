import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import PaletteIcon from "@mui/icons-material/Palette";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Chip from "@mui/material/Chip";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import "../FilteredCarsPage/FilteredCars.css";
import Stack from "@mui/material/Stack";

export default function FilteredCars(props) {
  const location = useLocation();
  const formData = location.state.filteredCars;
  const navigate = useNavigate();

  const filteredCar = formData.map((car) => (
    <div key={car.id} className="make">
      <div className="make-grid">
        <img src={car.imageLink} />
        <div
          className="car-specs-flex"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <Chip
            icon={<CarCrashIcon />}
            label={car.make + " " + car.model}
            style={{ fontFamily: "15px", fontWeight: "bold" }}
          />
          <Chip icon={<CalendarMonthIcon />} label={car.year} />
          <Chip icon={<PaletteIcon />} label={car.color} />
          <Chip icon={<AttachMoneyIcon />} label={car.pricePerDay + " /Day"} />
          <Button
            variant="contained"
            endIcon={<CreditCardIcon />}
            onClick={() => {
              navigate("rentcar", { state: { car } });
            }}
          >
            Rent
          </Button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="fleet-container">
      <div className="car-fleet">{filteredCar}</div>
    </div>
  );
}
