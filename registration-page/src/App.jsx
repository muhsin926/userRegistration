import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration_page from "./pages/Registration_page";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration_page />} />
      </Routes>
    </Router>
  );
};

export default App;
