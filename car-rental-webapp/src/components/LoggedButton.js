import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Menu, MenuItem } from "@mui/material";

import AuthContext from "../context/AuthProvider";

export default function LoggedButton() {
  const { auth, setAuth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="medium"
        variant="outlined"
        onClick={handleClick}
        startIcon={<AccountCircleIcon />}
      >
        Hello, {auth.authUserName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("myaccount");
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem
          onClick={() => {
            setAuth({ authUserName: "", authToken: "", login: false });
            localStorage.clear();
          }}
        >
          LogOut
        </MenuItem>
      </Menu>
    </div>
  );
}
