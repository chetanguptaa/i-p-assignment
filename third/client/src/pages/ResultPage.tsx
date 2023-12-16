import { useState, useEffect } from "react";
import axios from "axios";

type Result = {
  _id: string;
  data: string;
  result: number;
  __v: number;
};

type Results = Result[];

const ResultPage = () => {
  const [results, setResults] = useState<Results>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalRows = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/results");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const renderTableRow = (result: Result | null, index: number) => (
    <tr key={index}>
      {result?.data ? (
        <td className="border px-8 py-4 w-20">{result.data}</td>
      ) : (
        <td className="border px-8 py-7 w-20">{""}</td>
      )}
      {result?.result ? (
        <td className="border px-8 py-4 w-20">{result.result}</td>
      ) : (
        <td className="border px-8 py-4 w-20">{""}</td>
      )}
    </tr>
  );

  // Create an array of rows to be rendered, with null for empty rows
  const rowsToRender = Array.from({ length: totalRows }, (_, index) =>
    index < currentResults.length ? currentResults[index] : null
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <table className="shadow-lg">
          <thead>
            <tr>
              <th className="bg-slate-700 text-left px-8 py-4 text-white rounded-l-md">
                Password
              </th>
              <th className="bg-slate-700 text-left px-8 py-4 text-white rounded-r-md">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsToRender.map((result, index) => renderTableRow(result, index))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-slate-800 p-1 rounded text-white w-20 disabled:bg-slate-500"
          >
            Previous
          </button>
          <span className="mx-2  p-1 rounded text-black w-20 text-center">
            Page {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastResult >= results.length}
            className="bg-slate-800 p-1 rounded text-white text-center w-20 disabled:bg-slate-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
