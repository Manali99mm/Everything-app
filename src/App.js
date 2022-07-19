import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import GoogleAuth from "./Pages/GoogleAuth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./Routes/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute>
        <Navigate to="/dashboard" />
      </PrivateRoute>} >
      </Route>
      <Route path="/:type" element={<PrivateRoute>
        <Home />
      </PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/google/:token" element={<GoogleAuth />} />
    </Routes>
  )
}

export default App;