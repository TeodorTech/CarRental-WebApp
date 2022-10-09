import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/home";
import Navbar from "./components/Navbar";
import Fleet from "./Pages/Fleet/fleet";
import RentCar from "./Pages/RentCar/RentCar";
import FilteredCars from "./Pages/FilteredCarsPage/FilteredCars";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyAccount from "./components/MyAccount/MyAccount";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="filteredcars" element={<FilteredCars />} />
          <Route path="fleet/rentcar" element={<RentCar />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="fleet/rentcar/myaccount" element={<MyAccount />} />
          <Route path="myaccount" element={<MyAccount />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
