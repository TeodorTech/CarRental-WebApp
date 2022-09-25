import React from "react";
import { Dialog } from "@mui/material";
import Form from "./UpdateCarForm";

export default function UpdateCarModalDialog({
  open,
  handleClose,
  getCars,
  updateCar,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} getCars={getCars} updateCar={updateCar} />
    </Dialog>
  );
}
