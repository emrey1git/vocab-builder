import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dictionary from "./pages/Dictionary.jsx";
import Recommend from "./pages/RecommendPage.jsx";
import Training from "./pages/TrainingPage.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 
import "./App.css";
import TrainingPage from "./pages/TrainingPage.jsx";

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
              <TrainingPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
