import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((response) => {
        if (response.data.Status) {
          setEmployees(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees. Please try again later.");
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((response) => {
        if (response.data.Status) {
          setEmployees(employees.filter((employee) => employee.id !== id));
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please try again later.");
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3 className="font-bold text-xl">Employee List</h3>
      </div>
      <Link
        to="/dashboard/add_employee"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2 text-center">{employee.id}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-row">
                    {employee.image && (
                      <img
                        src={`http://localhost:3000/Images/${employee.image}`}
                        alt={employee.name}
                        className="w-20 h-20 m-3 flex items-center justify-center rounded-full bg-blue-600"
                      />
                    )}
                    <p className="item-center justify-center text-center p-8 mt-2">
                      {employee.name}
                    </p>
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  {employee.email}
                </td>
                <td className="border px-4 py-2 text-center">
                  {employee.address}
                </td>
                <td className="border px-4 py-2 text-center">
                  {employee.phone}
                </td>
                <td className="border px-4 py-2 text-center">
                  {employee.salary}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/dashboard/edit_employee/${employee.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
