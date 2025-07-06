import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  // send payload to login API endpoint -> POST
  const handleLogin = async () => {
    if (username && pwd) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/login/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username, pwd }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Something went wrong");
        }

        const data = await response.json();
        console.log(data.message);
        setCurrentUser(data.user);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Welcome to Kudos
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Spread recognition and positivity in your organization
        </p>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition font-semibold shadow-md"
        >
          Get Started
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
