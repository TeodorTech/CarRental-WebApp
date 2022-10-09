import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RentCarForm(props) {
  return (
    <form className="form-flex">
      <h1>Payment Details!</h1>
      <TextField
        className="textfield"
        label="UserName"
        name="userName"
        variant="filled"
        value={props.userName}
      />
      <TextField
        className="textfield"
        label="CarMake"
        name="carMake"
        variant="filled"
        value={props.car}
      />
      <TextField
        className="textfield"
        label="Period"
        name="period"
        variant="filled"
        value={props.period}
      />
      <TextField
        className="textfield"
        label="NumberOfDays"
        name="numberOfDays"
        variant="filled"
        value={props.days}
      />
      <TextField
        className="textfield"
        label="Payment Type"
        name="paymentType"
        variant="filled"
        value={props.paymentType}
      />
      <div className="payment-total">
        <h2 style={{ fontSize: "25px" }}>Total: {props.total} $</h2>
        {props.isRent ? (
          <CircularProgress />
        ) : props.checkout ? (
          <CheckCircleIcon fontSize="large" color="success" />
        ) : (
          <Button variant="contained" onClick={props.handleClickRent}>
            Rent Now
          </Button>
        )}
      </div>
    </form>
  );
}
