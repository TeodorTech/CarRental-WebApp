import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
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
            navigate("/");
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("fleet");
          }}
        >
          Fleet
        </MenuItem>
        {auth.authUserName === "admin" && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("dash");
            }}
          >
            Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>CONTACT</MenuItem>
      </Menu>
    </div>
  );
}
