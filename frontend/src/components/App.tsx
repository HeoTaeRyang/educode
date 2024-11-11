import { Route, Routes } from "react-router-dom";
//import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Aiask from "./Aiask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Aiask" element={<Aiask />} />
    </Routes>
  );
}

export default App;