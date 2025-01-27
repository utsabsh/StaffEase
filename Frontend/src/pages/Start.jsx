const Start = () => {
  return (
    <div className=" flex justify-center items-center h-screen bg-purple-700 w-full ">
      <div className="p-10 rounded w-1.5/4 border bg-gray-200">
        <h1 className="text-center text-xl italic pb-4 font-bold">
          Login to StaffEase
        </h1>
        <h2 className="text-center">Login As</h2>
        <div className="flex justify-between mt-5 mb-2 gap-4">
          <button
            type="button"
            className="bg-white border border-black hover:border-blue-700 hover:text-blue-700 w-30 text-black font-bold py-2 px-4 rounded"
          >
            Employee
          </button>
          <button
            type="button"
            className="bg-white border border-black hover:border-blue-700 hover:text-blue-700 w-30 text-black font-bold py-2 px-4 rounded"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
