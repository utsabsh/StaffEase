import { Link } from "react-router-dom";

const Employee = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <Link
        to="/dashboard/add_employee"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>
    </div>
  );
};

export default Employee;
