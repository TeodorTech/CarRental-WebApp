import { useState, useContext } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthProvider";

import axios from "axios";

export default function Form({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const { setAuth } = useContext(AuthContext);

  const [login, setLogin] = useState(false);

  async function handleFormSubmit(data) {
    const response = await axios.post(
      "https://localhost:7286/api/Authentication/login",
      data
    );
    const authToken = response.data.token;
    const authUserName = data.userName;
    setAuth({ authUserName, authToken });

    if (response) {
      setLogin(true);
    }

    setTimeout(() => {
      setLogin(false);
      handleClose();
    }, 2000);
  }

  return (
    <form className="form-flex" onSubmit={handleSubmit(handleFormSubmit)}>
      {login && <Alert>Logged In Succesfuly</Alert>}
      <h1>Log In, Driver!</h1>

      <TextField
        error={!!errors["userName"]}
        helperText={errors["userName"]?.message}
        label="UserName"
        {...register("userName", { required: "Field is required" })}
        variant="filled"
      />

      <TextField
        error={!!errors["password"]}
        helperText={errors["password"]?.message}
        label="Password"
        {...register("password", { required: "Field is Required" })}
        variant="filled"
      />

      <div className="ButtonGroup">
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
}
