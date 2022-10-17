import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Fleet/fleet.css";
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
import CarCard from "./CarCard";

export default function Fleet() {
  const [carsArray, setCarsArray] = useState([]);
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getCars();
  }, [deleteCar]);

  // declare a new state variable for modal open
  const [openAdd, setOpenAdd] = useState(false);

  // function to handle modal open
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  // function to handle modal close
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const navigate = useNavigate();

  async function getCars() {
    await axios
      .get("https://localhost:7286/api/car/getallcars")
      .then((response) => setCarsArray(response.data));
  }

  async function deleteCar(carId) {
    await axios.delete(`https://localhost:7286/api/car/${carId}`);
    // getCars();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  const make = carsArray.map((car) => (
    <CarCard
      key={car.id}
      car={car}
      auth={auth}
      deleteCar={deleteCar}
      getCars={getCars}
    />
  ));
  return (
    <div className="fleet-container">
      <div className="addcar-btn">
        {auth.authUserName === "admin" && (
          <Button
            variant="contained"
            onClick={handleOpenAdd}
            startIcon={<AddCarIcon />}
          >
            Add Car
          </Button>
        )}
        {showAlert && (
          <Alert marginBottom={"10px"}>Car Deleted Succesfuly</Alert>
        )}
        <FleetModalDialog
          open={openAdd}
          handleClose={handleCloseAdd}
          getCars={getCars}
        />
      </div>
      <div className="car-fleet">{make}</div>
    </div>
  );
}
