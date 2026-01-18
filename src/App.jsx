import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dictionary from "./pages/Dictionary.jsx";
import Recommend from "./pages/RecommendPage.jsx";
import Training from "./pages/TrainingPage.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";

import "./App.css";

function App() {
  const location = useLocation();

  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    
    <div className="container">
      {showHeader && <Header />}{" "}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dictionary"
          element={
            <PrivateRoute>
              <Dictionary />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommend"
          element={
            <PrivateRoute>
              <Recommend />
            </PrivateRoute>
          }
        />
        <Route
          path="/training"
          element={
            <PrivateRoute>
              <Training />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
