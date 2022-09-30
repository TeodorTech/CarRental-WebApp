import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";

export default function LoginButtton({ handleOpen }) {
  return (
    <div className="li-login" onClick={handleOpen}>
      <Button size="large" variant="outlined" startIcon={<LoginIcon />}>
        LogIn
      </Button>
    </div>
  );
}
