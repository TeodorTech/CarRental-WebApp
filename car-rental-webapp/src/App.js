import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/home";
import Navbar from "./components/Navbar";
import Fleet from "./Pages/Fleet/fleet";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="fleet" element={<Fleet />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
