import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/home";
import Navbar from "./components/Navbar";
import Fleet from "./Pages/Fleet/fleet";
import FilteredCars from "./Pages/FilteredCarsPage/FilteredCars";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="filteredcars" element={<FilteredCars />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
