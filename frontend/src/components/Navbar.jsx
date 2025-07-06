import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout/`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.data;
        throw new Error(errorData.error || "Something went wrong!");
      }

      const data = await response.json();
      console.log(data.message);
      setCurrentUser(null); // Clear user from state
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-3xl">
      <Link to="/" className="text-2xl font-extrabold text-indigo-600">
        Kudos 🎉
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="text-right">
              <p className="font-semibold text-indigo-700">{user.username}</p>
              <p className="text-sm text-gray-500">{user.org}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-500 hover:to-red-700 shadow"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 shadow"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
