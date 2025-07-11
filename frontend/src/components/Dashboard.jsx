// Dashboard.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GiveKudosModal from "./GiveKudosModal";

const Dashboard = ({ user, setCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [usersInOrg, setUsersInOrg] = useState(null);
  const [kudosGiven, setKudosGiven] = useState([]);
  const [kudosReceived, setKudosReceived] = useState([]);
  const [kudosLeft, setKudosLeft] = useState(0);
  const navigate = useNavigate();

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
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Auth failed", error);
        setCurrentUser(null);
        navigate("/login");
      }
    };

    authCheck();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.org}`
      );
      const users = await response.json();
      const usersOtherThanMe = users.filter(
        (u) => u.username !== user.username
      );
      setUsersInOrg(usersOtherThanMe);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchKudos = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/kudos_stats/${user.username}/`
      );
      const { given, received, remaining } = await response.json();
      console.log(given, received);
      setKudosGiven(given);
      setKudosReceived(received);
      setKudosLeft(remaining);
    };

    fetchKudos();
  }, [showModal]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-700">
            Hey, {user.username} 👋
          </h1>
          <p className="text-md text-gray-600">
            Organization: <span className="font-semibold">{user.org}</span>
          </p>
        </div>
        <span className="inline-block bg-green-200 text-green-900 px-4 py-2 rounded-full font-semibold shadow">
          🎉 {kudosLeft} Kudos Left This Week
        </span>
      </div>

      {kudosLeft > 0 ? (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Give Kudos
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-purple-600 hover:to-pink-600"
          >
            + Give Kudos
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            You have exhausted your Kudos !
          </h2>

          <h2 className="text-purple-500 text-xl">Come back next week!</h2>
        </div>
      )}

      <div className="bg-white p-6 rounded-3xl shadow mb-10">
        <h3 className="text-lg font-bold text-indigo-600 mb-4">
          People in your organization
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {usersInOrg &&
            usersInOrg.map((u, idx) => (
              <li
                key={idx}
                className="p-4 bg-indigo-50 rounded-xl text-center shadow-sm"
              >
                {u.username}
              </li>
            ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-lg font-bold text-purple-600 mb-2">
            Recent Kudos You Gave
          </h3>
          {kudosGiven && kudosGiven.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {kudosGiven.map((kudo, index) => (
                <li key={index} className="border-b pb-2">
                  To <span className="font-semibold">{kudo.receiver}</span>: "
                  {kudo.message}"
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No kudos given yet.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-lg font-bold text-purple-600 mb-2">
            Recent Kudos You Received
          </h3>
          {kudosReceived && kudosReceived.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {kudosReceived.map((kudo, index) => (
                <li key={index} className="border-b pb-2">
                  From <span className="font-semibold">{kudo.sender}</span>: "
                  {kudo.message}"
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No kudos received yet.</p>
          )}
        </div>
      </div>

      {showModal && (
        <GiveKudosModal
          onClose={() => setShowModal(false)}
          usersInOrg={usersInOrg}
          user={user}
          kudosLeft={kudosLeft}
        />
      )}
    </div>
  );
};

export default Dashboard;
