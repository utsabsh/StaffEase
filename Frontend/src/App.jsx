import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/LoginPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import AddEmployee from "./component/AddEmployee";
import Employee from "./pages/Employee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employeelogin" element={<EmployeeLogin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
        </Route>
        <Route
          path="/employee_dashboard"
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
