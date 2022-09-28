import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

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

  const [login, setLogin] = useState(false);

  async function handleFormSubmit(data) {
    const response = await axios.post(
      "https://localhost:7286/api/Authentication/login",
      data
    );
    if (response) {
      setLogin(true);
      console.log(login);
      handleClose();
    }
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit(handleFormSubmit)}>
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
