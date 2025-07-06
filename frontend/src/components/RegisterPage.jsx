import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [org, setOrg] = useState("");
  const navigate = useNavigate();

  //send payload to register api endpoint -> POST
  const handleRegister = async () => {
    if (username && pwd && org) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/register/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username, org, pwd }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Something went wrong");
        }

        const data = await response.json();
        console.log(data.message);
        // setCurrentUser(data.user);
        console.log("User is redirected to Login Page");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          Create Your Kudos Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Join your team and start giving recognition
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <input
          type="text"
          placeholder="Organization"
          className="w-full p-3 mb-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition font-semibold shadow-md"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
