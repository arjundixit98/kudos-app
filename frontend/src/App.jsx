import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
const App = () => {
  const mockUser = {
    name: "Arjun Dixit",
    org: "OpenAI",
  };

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Navbar user={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
