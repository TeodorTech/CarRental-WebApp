import React from "react";
import { TextField, Button } from "@mui/material";
import "./SignupForm.css";
import axios from "axios";

export default function Form({ handleClose }) {
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    city: "",
    age: "",
    email: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("https://localhost:7286/api/user", user);
    handleClose();
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit}>
      <h1>Hello Driver, sign up below!</h1>
      <TextField
        label="First Name"
        name="firstName"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="City"
        name="city"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Age"
        name="age"
        variant="filled"
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        variant="filled"
        type="email"
        required
      />
      {/* <TextField label="Password"name="password" variant="filled" type="password" required /> */}
      <div className="ButtonGroup">
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
}
