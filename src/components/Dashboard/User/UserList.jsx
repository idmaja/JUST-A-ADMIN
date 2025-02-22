"use client";

import { useState } from "react";
import UserEditModal from "./UserEditModal";
import { Trash, PencilSimple, Play } from "@phosphor-icons/react";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    await fetch(`/api/v1/admin/users/${id}`, { method: "DELETE" });
    location.reload();
  };

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
      {users.map((user) => (
        <div key={user.id} className="p-6 transition-all transform rounded-lg shadow-lg bg-color-accent hover:scale-105">
          <div className="flex items-center mb-2">
            <Play size={20} weight="fill" className="mr-2 text-color-secondary" />
            <h3 className="text-lg font-bold text-color-primary">Username: {user.username || "N/A"}</h3>
          </div>
          <p className="text-color-primary">Email: {user.email}</p>
          <p className="text-color-primary">Password: {user.password || "N/A"}</p>
          <p className="text-color-primary">Role: {user.role}</p>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => setSelectedUser(user)}
              className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-secondary hover:bg-color-primary hover:text-color-accent"
            >
              Edit
              <PencilSimple className="ml-2" size={18} />
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-red hover:bg-color-primary hover:text-color-accent"
            >
              Delete
              <Trash className="ml-2" size={18} />
            </button>
          </div>
        </div>
      ))}
      {selectedUser && (
        <UserEditModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserList;
