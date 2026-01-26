"use client";

import { useEffect, useState } from "react";

const UserListHome = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = useState([]); 
  const [index, setIndex] = useState(0); 
  const rowsPerPage = 2; 


  const [showTables, setShowTables] = useState(false);

  useEffect(() => {
    setVisibleUsers(users.slice(0, rowsPerPage));
    setShowTables(true);

    const interval = setInterval(() => {
      setShowTables(false); 

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + rowsPerPage) % users.length);
        setShowTables(true); 
      }, 300); 
    }, 3000);

    return () => clearInterval(interval);
  }, [users]);

  useEffect(() => {
    setVisibleUsers(users.slice(index, index + rowsPerPage));
  }, [index, users]);

  return (
    <div className={`mb-12 transition-all duration-500 ${showTables ? 'animate-slideUp' : 'opacity-0'}`}>
      <table className="w-full border border-collapse border-gray-300 table-auto ">
        <thead>
          <tr className="bg-color-secondary text-color-hover">
            <th className="px-4 py-2 border w-96">Email</th>
            <th className="px-4 py-2 border w-96">Username</th>
            <th className="px-4 py-2 border w-60">Role</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 uppercase border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListHome;
