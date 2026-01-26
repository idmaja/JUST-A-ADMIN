"use client";

import { useState, useEffect } from "react";

const UserEditModal = ({ user, onClose }) => {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSave = async () => {
    await fetch(`/api/v1/admin/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password, role }),
    });

    onClose();
    location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-40">
      <div
        className={`p-6 bg-color-hover rounded-lg shadow-lg transform transition-transform duration-300 w-80 ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <h2 className="mb-4 text-xl font-bold text-color-primary">Edit User</h2>
        <div className="mb-4">
          <label className="block text-color-primary">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-color-primary">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-color-primary">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        
        {user.role !== "user" && (
          <div className="mb-4">
            <label className="block text-color-primary">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded text-color-primary bg-color-red hover:bg-red-600">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded text-color-primary bg-color-secondary hover:bg-green-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
