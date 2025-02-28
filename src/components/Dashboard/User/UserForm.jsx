"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SuccessModal from '../../Utilities/SuccessModal';

const UserForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showAlreadyModal, setShowAlreadyModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === 409) {
        setShowAlreadyModal(true);
        setTimeout(() => setShowAlreadyModal(false), 3000);
      } else if (result.isCreated) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.refresh();
        }, 3000);
      } else {
        setShowFailedModal(true);
        setTimeout(() => setShowFailedModal(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 mb-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full px-5 py-3 mt-6 mb-2 text-sm font-medium transition-all border rounded-full me-2 text-color-primary border-color-secondary hover:bg-color-yellow hover:text-color-primary"
        >
          Create Account
        </button>
      </form>

      {showSuccessModal && (
        <SuccessModal message="User created successfully!" />
      )}

      {showFailedModal && (
        <SuccessModal message="User failed to input, try again!" />
      )}

      {showAlreadyModal && (
        <SuccessModal message="User with this email already exists!" />
      )}
    </>
  );
};

export default UserForm;
