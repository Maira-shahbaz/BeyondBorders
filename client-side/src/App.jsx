import React from "react";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List.jsx";
import Hotel from "./pages/Hotel.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home.jsx";

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
