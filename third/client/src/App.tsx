import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./pages/InputForm";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-100 to-blue-100 font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
