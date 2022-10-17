import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddCarIcon from "@mui/icons-material/ControlPoint";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Stack from "@mui/material/Stack";
import FleetModalDialog from "../Fleet/FleetModalDialog";
import UpdateCarModalDialog from "../Fleet/UpdateCarModalDialog";
import AuthContext from "../../context/AuthProvider";
import { Alert } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

export default function CarCard({ car, auth, deleteCar, getCars }) {
  const [carToUpdate, setCarToUpdate] = useState(null);
  // declare a new state variable for modal open
  const [openUpdate, setOpenUpdate] = useState(false);
  // function to handle modal open
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  // function to handle modal close
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  async function deleteCar(carId) {
    await axios.delete(`https://localhost:7286/api/car/${carId}`);
    // getCars();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  return (
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
        </div>
      </div>
      <Stack
        className="stack-buttons"
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        style={{ marginBottom: "20px" }}
      >
        {auth.authUserName === "admin" && (
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            color="error"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete?")) {
                deleteCar(car.id);
              }
            }}
          >
            Delete
          </Button>
        )}
        {auth.authUserName === "admin" && (
          <Button
            variant="contained"
            color="warning"
            endIcon={<SaveIcon />}
            onClick={() => {
              setCarToUpdate(car);
              handleOpenUpdate();
            }}
          >
            Update
          </Button>
        )}
        <UpdateCarModalDialog
          open={openUpdate}
          handleClose={handleCloseUpdate}
          getCars={getCars}
          updateCar={carToUpdate}
        />
        <Button
          variant="contained"
          endIcon={<CreditCardIcon />}
          onClick={() => {
            navigate("rentcar", { state: { car } });
          }}
        >
          Rent
        </Button>
      </Stack>
    </div>
  );
}
