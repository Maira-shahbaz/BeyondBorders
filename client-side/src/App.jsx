import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import List from "./pages/list/listItem.jsx";
import Hotel from "./pages/hotel/hotel.jsx";
import Login from "./pages/login/login.jsx"; // <-- fixed path

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<List />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
