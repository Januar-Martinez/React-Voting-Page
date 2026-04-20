import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Administrator from "./pages/Administrator.jsx";
import Voter from "./pages/Voter.jsx";
import Candidate from "./pages/Candidate.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Administrator />
            </PrivateRoute>
          }
        />
        <Route
          path="/voter"
          element={
            <PrivateRoute>
              <Voter />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidate"
          element={
            <PrivateRoute>
              <Candidate />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
