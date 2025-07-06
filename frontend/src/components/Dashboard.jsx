// Dashboard.jsx
import { useState } from "react";
import GiveKudosModal from "./GiveKudosModal";

const Dashboard = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const usersInOrg = ["Alice", "Bob", "Charlie"];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-700">
            Hey, {user.name} 👋
          </h1>
          <p className="text-md text-gray-600">
            Organization: <span className="font-semibold">{user.org}</span>
          </p>
        </div>
        <span className="inline-block bg-green-200 text-green-900 px-4 py-2 rounded-full font-semibold shadow">
          🎉 3 Kudos Left This Week
        </span>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Give Kudos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-purple-600 hover:to-pink-600"
        >
          + Give Kudos
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow mb-10">
        <h3 className="text-lg font-bold text-indigo-600 mb-4">
          People in your organization
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {usersInOrg.map((u, idx) => (
            <li
              key={idx}
              className="p-4 bg-indigo-50 rounded-xl text-center shadow-sm"
            >
              {u}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-lg font-bold text-purple-600 mb-2">
            Recent Kudos You Gave
          </h3>
          <p className="text-sm text-gray-500">No kudos given yet.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-lg font-bold text-purple-600 mb-2">
            Recent Kudos You Received
          </h3>
          <p className="text-sm text-gray-500">No kudos received yet.</p>
        </div>
      </div>

      {showModal && <GiveKudosModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
