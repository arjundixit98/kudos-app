import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth_check/`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.log("Auth failed", error);
        setCurrentUser(null);
      }
    };

    authCheck();
  }, []);

  return (
    <Router>
      <Navbar user={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard user={currentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
