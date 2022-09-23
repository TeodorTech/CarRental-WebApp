import React from "react";
import { Dialog } from "@mui/material";
import Form from "./AddCarForm";

export default function FleetModalDialog({ open, handleClose, getCars }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} getCars={getCars} />
    </Dialog>
  );
}
