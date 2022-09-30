import { useContext, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import "./SignupForm.css";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

export default function Form({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      age: "",
      email: "",
      userName: "",
      password: "",
    },
  });
  const { auth, setAuth } = useContext(AuthContext);
  const [signup, setSignup] = useState(false);

  const regex = {
    psw: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  async function handleFormSubmit(data) {
    const response = await axios
      .post("https://localhost:7286/api/Authentication/register", data)
      .then((response) => response.status);
    if (response) {
      setSignup(true);
      const response = await axios
        .post("https://localhost:7286/api/Authentication/login", data)
        .then((response) => response.data);
      if (response) {
        const authToken = response.token;
        const authUserName = data.userName;
        const login = signup;
        setAuth({ authUserName, authToken, login });
      }
    }

    setTimeout(() => {
      setSignup(false);
      handleClose();
    }, 3000);
  }
  return (
    <form className="form-flex" onSubmit={handleSubmit(handleFormSubmit)}>
      {signup && <Alert>Signed Up Succesfuly</Alert>}
      <h1>Hello Driver, sign up below!</h1>
      <TextField
        label="First Name"
        error={!!errors["firstName"]}
        helperText={errors["firstName"]?.message}
        {...register("firstName", { required: "This field is required" })}
        variant="filled"
      />
      <TextField
        label="Last Name"
        error={!!errors["lastName"]}
        helperText={errors["lastName"]?.message}
        {...register("lastName", { required: "This field is required" })}
        variant="filled"
      />
      <TextField
        label="City"
        error={!!errors["city"]}
        helperText={errors["city"]?.message}
        {...register("city", { required: "This field is required" })}
        variant="filled"
      />
      <TextField
        label="Age"
        error={!!errors["age"]}
        helperText={errors["age"]?.message}
        type="number"
        {...register("age", {
          min: { value: 18, message: "You need to be older than 18!" },
        })}
        variant="filled"
      />
      <TextField
        label="Email"
        error={!!errors["email"]}
        helperText={errors["email"]?.message}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: regex.email,
            message: "Wrong email format",
          },
        })}
        variant="filled"
      />
      <TextField
        label="UserName"
        {...register("userName", { required: "This field is required" })}
        variant="filled"
      />
      <TextField
        label="Password"
        error={!!errors["password"]}
        helperText={errors["password"]?.message}
        {...register("password", {
          required: "This field is required",
          pattern: {
            value: regex.psw,
            message:
              "Password must have minimum one upper case,one number and one special caracter",
          },
        })}
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
