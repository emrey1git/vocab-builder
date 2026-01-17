import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dictionary  from "./pages/Dictionary.jsx"
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./App.css";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dictionary" element={<PrivateRoute><Dictionary /></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
