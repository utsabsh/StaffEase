import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded w-1/3 border shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Department</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-4">
            <label htmlFor="category" className="block">
              <strong>Department:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Department"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
