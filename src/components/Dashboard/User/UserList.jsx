"use client";

import { useState } from "react";
import UserEditModal from "./UserEditModal";
import { Trash, PencilSimple, Play } from "@phosphor-icons/react";
import DeleteModal from "@/components/Utilities/DeleteModal";
import SuccessModal from "../../Utilities/SuccessModal";

const UserList = ({ users }) => {

  const [selectedUserEdit, setSelectedUserEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserDelete, setSelectedUserDelete] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showAlreadyModal, setShowAlreadyModal] = useState(false);

  const handleOpenDeleteModal = (user) => {
    setSelectedUserDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUserDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserDelete) {
      try {
        const response = await fetch(`/api/v1/admin/users/${selectedUserDelete.id}`, { 
          method: "DELETE" 
        });
        const result = await response.json();

        if (result.status === 200 && result.isDeleted) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            location.reload();
          }, 2000);
        } else if (result.status === 403) {
          setShowAlreadyModal(true);
          setTimeout(() => {
            setShowAlreadyModal(false);
          }, 2000);
        } else {
          setShowFailedModal(true);
          setTimeout(() => {
            setShowFailedModal(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error deleting user: ", error);
        setShowFailedModal(true);
        setTimeout(() => {
          setShowFailedModal(false);
        }, 2000);
      }
      handleCloseDeleteModal();
    }
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
              onClick={() => setSelectedUserEdit(user)}
              className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-secondary hover:bg-color-primary hover:text-color-accent"
            >
              Edit
              <PencilSimple className="ml-2" size={18} />
            </button>
            <button
              onClick={() => handleOpenDeleteModal(user)}
              className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-red hover:bg-color-primary hover:text-color-accent"
            >
              Delete
              <Trash className="ml-2" size={18} />
            </button>
          </div>
        </div>
      ))}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Pengguna"
        message={`Anda yakin ingin menghapus pengguna "${selectedUserDelete?.username}"?`}
      />
      {selectedUserEdit && (
        <UserEditModal 
          user={selectedUserEdit} 
          onClose={() => setSelectedUserEdit(null)} 
        />
      )}

      {showSuccessModal && (
        <SuccessModal message="Akun berhasil dihapus!" />
      )}
      {showFailedModal && (
        <SuccessModal message="Gagal menghapus akun, coba lagi!" />
      )}
      {showAlreadyModal && (
        <SuccessModal message="Admin tidak bisa dihapus!" />
      )}
    </div>
  );
};

export default UserList;
