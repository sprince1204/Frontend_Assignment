import React, { useState } from "react";

const AdditionForm = ({ open, onClose, users, status, priority }) => {
  const [formData, setFormData] = useState({
    id: "DUM-99",
    title: "Dummy Entry",
    tag: ["Feature request"],
    userId: "usr-1",
    status: "Todo",
    priority: 4,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!open) return null; // Don't render if not open

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          className="text-field"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          disabled
        />
        <textarea
          className="text-field"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          rows={4}
        />
        <input
          className="text-field"
          name="tag"
          value={formData.tag.join(", ")}
          disabled
        />
        <select
          className="select-field"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
        >
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          className="select-field"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          {status?.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          className="select-field"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
        >
          {Object.keys(priority).map((p) => (
            <option key={p} value={p}>
              {priority[p]}
            </option>
          ))}
        </select>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #ffffff;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
        }

        .text-field,
        .select-field {
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        .text-field:disabled {
          background-color: #f0f0f0;
        }

        .close-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .close-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AdditionForm;
