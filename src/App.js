import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/questionnaire/:id" element={<Quiz />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
