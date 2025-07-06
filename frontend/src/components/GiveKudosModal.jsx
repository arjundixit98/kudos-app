// GiveKudosModal.jsx
import { useState } from "react";
const GiveKudosModal = ({ onClose }) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [kudosLeft, setKudosLeft] = useState(3);

  const users = ["Alice", "Bob", "Charlie"];

  const handleSubmit = () => {
    if (recipient && message) {
      alert(`🎉 Kudo sent to ${recipient}:\n\n“${message}”`);
      setKudosLeft(kudosLeft - 1);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Send Kudos</h2>

        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Select Teammate
        </label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">-- Choose --</option>
          {users.map((u, idx) => (
            <option key={idx} value={u}>
              {u}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="What did they do great?"
        ></textarea>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Kudos Left: {kudosLeft}</span>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveKudosModal;
