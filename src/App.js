import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GoogleAuth from "./Pages/GoogleAuth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./Routes/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";
import MovieSeriesProvider from "./Context/MovieSeriesContext";
import QuotesList from "./Components/QuotesList";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute>
          <Navigate to="/dashboard" />
        </PrivateRoute>} >
        </Route>
        <Route path="/:type" element={<PrivateRoute>
          <MovieSeriesProvider>
            <Home />
          </MovieSeriesProvider>
        </PrivateRoute>} />
        <Route path="/quote/:id" element={
          <PrivateRoute>
            <QuotesList />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google/:token" element={<GoogleAuth />} />
      </Routes>
    </>
  )
}

export default App;