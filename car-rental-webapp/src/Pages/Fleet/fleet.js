import { useState, useEffect } from "react";
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
import { Alert } from "@mui/material";

export default function Fleet() {
  const [carsArray, setCarsArray] = useState([]);
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getCars();
  }, []);

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
  const navigate = useNavigate();

  async function getCars() {
    await axios
      .get("https://localhost:7286/api/car/getallcars")
      .then((response) => setCarsArray(response.data));
  }

  async function deleteCar(carId) {
    await axios.delete(`https://localhost:7286/api/car/${carId}`);
    getCars();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  const make = carsArray.map((car) => (
    <div key={car.id} className="make">
      <div className="car-specs-flex">
        {car.make} {car.model} {car.year}
      </div>
      <img src={car.imageLink} />
      <Stack direction="row" spacing={2} style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          size="medium"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete?")) {
              deleteCar(car.id);
            }
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="warning"
          endIcon={<SaveIcon />}
          onClick={() => {
            setCarToUpdate(car);
            handleOpenUpdate();
          }}
        >
          Update
        </Button>
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
  ));
  return (
    <div className="fleet-container">
      <div className="addcar-btn">
        <Button
          variant="contained"
          onClick={handleOpenAdd}
          startIcon={<AddCarIcon />}
        >
          Add Car
        </Button>
        {showAlert && (
          <Alert marginBottom={"10px"}>Car Deleted Succesfuly</Alert>
        )}
        <FleetModalDialog
          open={openAdd}
          handleClose={handleCloseAdd}
          getCars={getCars}
        />
      </div>
      <div className="makes-flex">{make}</div>
    </div>
  );
}
