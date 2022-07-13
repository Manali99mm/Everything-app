import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />} >
      </Route>
      <Route path="/:type" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App;