import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="px-5 mt-3">
      <div className="flex justify-center">
        <h3 className="text-xl font-bold">Department List</h3>
      </div>
      <Link
        to="/dashboard/add_category"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Department
      </Link>
      <div className="mt-3 flex justify-center ">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr key={c.id}>
                <td className="border px-4 py-2">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
