import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/LoginPage";
import EmployeeLogin from "./pages/EmployeeLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employeelogin" element={<EmployeeLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
