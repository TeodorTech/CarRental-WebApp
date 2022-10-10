import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "../MyAccount/MyAccount.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MyAccount() {
  const { auth } = useContext(AuthContext);
  const [bookingsArray, setBookingsArray] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getBookingsBYUserId();
  }, []);

  async function getBookingsBYUserId() {
    await axios
      .get(`https://localhost:7286/api/booking/getbyuser/${auth.userId}`)
      .then((response) => {
        setBookingsArray(response.data);
      });
  }
  async function deleteCar(bookingId) {
    await axios.delete(`https://localhost:7286/api/booking/${bookingId}`);
    getBookingsBYUserId();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  const books = bookingsArray.map((book) => (
    <div key={book.bookingId} className="book-grid">
      <h4> Car Name</h4>
      <h4> Start Day</h4>
      <h4>End Day</h4>
      <h4>Total Cost</h4>
      <Button
        variant="contained"
        size="small"
        style={{ marginTop: "30px" }}
        startIcon={<DeleteIcon />}
        color="error"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete?")) {
            deleteCar(book.bookingId);
          }
        }}
      >
        Cancel Book
      </Button>
      <div>{book.carMake}</div>
      <div>{book.startDate}</div>
      <div>{book.endDate}</div>
      <div>{book.totalCost} $</div>
    </div>
  ));

  return (
    <>
      <h1>Hello User</h1>
      <div className="books-main">{books}</div>
    </>
  );
}
