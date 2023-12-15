import { FormEvent, useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState(0);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const output = await axios.post("http://localhost:3000/api/save", {
        data: inputValue,
      });
      setOutputValue(output.data.result);
      console.log(output.data.result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <>
      <a
        href="/results"
        className="absolute top-4 right-4 text-blue-700 hover:underline"
      >
        Results
      </a>
      <div className="flex items-center justify-center h-screen">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              disabled={inputValue === ""}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4 disabled:bg-blue-400"
            >
              Submit
            </button>
            <button
              disabled={inputValue === ""}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-400"
              onClick={() => setInputValue("")}
            >
              Cancel
            </button>
          </div>
          {
            <div className="mt-4 text-center text-green-600">
              Output: {outputValue}
            </div>
          }
        </form>
      </div>
    </>
  );
};

export default InputForm;
