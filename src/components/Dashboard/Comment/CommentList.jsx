"use client";

import DeleteModal from "@/components/Utilities/DeleteModal";
import { Play, Trash } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import SuccessModal from "../../Utilities/SuccessModal";


const groupByUsername = (comments) => {
  return comments.reduce((acc, curr) => {
    if (!acc[curr.username]) {
      acc[curr.username] = [];
    }
    acc[curr.username].push(curr);
    return acc;
  }, {});
};

const CommentList = ({ comment }) => {


  const groupedComments = useMemo(() => groupByUsername(comment), [comment]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleOpenDeleteModal = (comment) => {
    setSelectedComment(comment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedComment(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedComment) {
      try {
        const response = await fetch(`/api/v1/admin/comments/${selectedComment.id}`, { 
          method: "DELETE" 
        });

        const result = await response.json();

        if (result.status === 200 && result.isDeleted) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            location.reload();
          }, 2000);
        } else {
          setShowFailedModal(true);
          setTimeout(() => {
            setShowFailedModal(false);
          }, 2000);
        }
      } catch (error) {
        
        setShowFailedModal(true);
        setTimeout(() => {
          setShowFailedModal(false);
        }, 2000);
      }
      handleCloseDeleteModal();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Object.keys(groupedComments).map((username) => (
        <div key={username} className="p-6 transition-all transform rounded-lg shadow-lg bg-color-accent hover:scale-105">
          <div className="flex items-center mb-4">
            <Play size={20} weight="fill" className="mr-2 text-color-secondary" />
            <h3 className="text-lg font-bold text-color-primary">Username: {username || "N/A"}</h3>
          </div>
          
          <div className="space-y-4">
            {groupedComments[username].map((commentItem) => (
              <div key={commentItem.id} className="p-4 rounded-lg shadow-md bg-color-primary">
                <p className="font-bold text-color-accent">Anime Title: {commentItem.anime_title || "N/A"}</p>
                <p className="text-color-accent">Comment: {commentItem.comment}</p>
                
                <div className="mt-2">
                  <button
                    onClick={() => handleOpenDeleteModal(commentItem)}
                    className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-red hover:bg-red-700"
                  >
                    Delete
                    <Trash className="ml-2" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Komentar"
        message={`Anda yakin ingin menghapus komentar dari "${selectedComment?.username}" di "${selectedComment?.anime_title}"?`}
      />

      {showSuccessModal && (
        <SuccessModal message="Komentar berhasil dihapus!" />
      )}
      {showFailedModal && (
        <SuccessModal message="Gagal menghapus komentar, coba lagi!" />
      )}
    </div>
  );
};

export default CommentList;
