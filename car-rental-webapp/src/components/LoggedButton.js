import React, { useContext } from "react";
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

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="large"
        variant="outlined"
        onClick={handleClick}
        startIcon={<AccountCircleIcon />}
      >
        Hello,{auth.authUserName}
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
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem
          onClick={() =>
            setAuth({ authUserName: "", authToken: "", login: false })
          }
        >
          LogOut
        </MenuItem>
      </Menu>
    </div>
  );
}
