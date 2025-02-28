"use client"

import DeleteModal from "@/components/Utilities/DeleteModal";
import { Play, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import SuccessModal from "../../Utilities/SuccessModal";

// Function to group collections by user_email
const groupByUserEmail = (collection) => {
  return collection.reduce((acc, curr) => {
    if (!acc[curr.user_email]) {
      acc[curr.user_email] = [];
    }
    acc[curr.user_email].push(curr);
    return acc;
  }, {});
};

const CollectionList = ({ collection }) => {

  // Group collections by user_email
  const groupedCollections = useMemo(() => groupByUserEmail(collection), [collection]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleOpenDeleteModal = (collection) => {
    setSelectedCollection(collection);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCollection(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedCollection) {
      try {
        const response = await fetch(`/api/v1/admin/collection/${selectedCollection.id}`, { 
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
        console.error("Error deleting collection: ", error);
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
      {Object.keys(groupedCollections).map((userEmail) => (
        <div key={userEmail} className="p-6 transition-all transform rounded-lg shadow-lg bg-color-accent hover:scale-105">
          <div className="flex items-center mb-4">
            <Play size={20} weight="fill" className="mr-2 text-color-secondary" />
            <h3 className="text-lg font-bold text-color-primary">User Email: {userEmail || "N/A"}</h3>
          </div>
          
          <div className="space-y-4">
            {groupedCollections[userEmail].map((collectionItem) => (
              <div key={collectionItem.id} className="flex items-center p-4 space-x-6 rounded-lg shadow-md">
                {/* Anime Image */}
                <Image 
                  src={collectionItem.anime_image} 
                  width={100} 
                  height={100} 
                  className="rounded-md"
                  alt={collectionItem.anime_title || "Anime image"} 
                />

                <div>
                  <p className="text-color-primary">Anime ID: {collectionItem.anime_mal_id || "N/A"}</p>
                  <p className="text-color-primary">Title: {collectionItem.anime_title || "N/A"}</p>
                </div>

                <div className="ml-auto">
                  <button
                    onClick={() => handleOpenDeleteModal(collectionItem)}
                    className="flex items-center px-4 py-2 text-white transition-colors rounded bg-color-red hover:bg-color-primary hover:text-color-accent"
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
        title="Hapus Koleksi"
        message={`Anda yakin ingin menghapus "${selectedCollection?.anime_title}" dari "${selectedCollection?.user_email}" ?`}
      />

      {showSuccessModal && (
        <SuccessModal message="Koleksi berhasil dihapus!" />
      )}
      {showFailedModal && (
        <SuccessModal message="Gagal menghapus koleksi, coba lagi!" />
      )}
    </div>
  );
};

export default CollectionList;
