import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
