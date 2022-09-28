import React from "react";
import { Dialog } from "@mui/material";
import Form from "./LogInForm";

export default function ModalDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form handleClose={handleClose} />
    </Dialog>
  );
}
