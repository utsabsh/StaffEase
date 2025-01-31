import { useState } from "react";

import { Link } from "react-router-dom";

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  return (
    <section className="h-screen  bg-purple-700 flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-14 items-center my-2 mx-5 md:mx-0 md:my-0 ">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="border-r-[3px] border-slate-950"></div>
      <div className="md:w-1/3 max-w-sm border p-3 bg-slate-200 rounded shadow-lg md:ml-6">
        <div className="text-center md:text-left">
          <h1 className="text-center mb-5  font-bold text-xl ">
            Login to StaffEase
          </h1>
        </div>

        <form className="flex flex-col ">
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            autoComplete="off"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <div className="text-red-600 ">{error}</div>
          <div className="mb-1 mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployeeLogin;
