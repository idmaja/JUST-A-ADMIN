"use client"

import { Play, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useMemo } from "react";

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

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this collection?");
    if (!confirmed) return;

    await fetch(`/api/v1/admin/collection/${id}`, { method: "DELETE" });
    location.reload();  // Reload the page after deletion
  };

  return (
    <div className="mt-6 space-y-6">
      {Object.keys(groupedCollections).map((userEmail) => (
        <div key={userEmail} className="p-6 transition-all transform rounded-lg shadow-lg bg-color-accent hover:scale-105">
          {/* User Email Header */}
          <div className="flex items-center mb-4">
            <Play size={20} weight="fill" className="mr-2 text-color-secondary" />
            <h3 className="text-lg font-bold text-color-primary">User Email: {userEmail || "N/A"}</h3>
          </div>
          
          {/* Horizontal list of collections for the same user_email */}
          <div className="space-y-4">
            {groupedCollections[userEmail].map((collectionItem) => (
              <div key={collectionItem.id} className="flex items-center p-4 space-x-6 bg-white rounded-lg shadow-md">
                {/* Anime Image */}
                <Image 
                  src={collectionItem.anime_image} 
                  width={100} 
                  height={100} 
                  className="rounded-md"
                  alt={collectionItem.anime_title || "Anime image"} 
                />
                {/* Anime Details */}
                <div>
                  <p className="text-color-primary">Anime ID: {collectionItem.anime_mal_id || "N/A"}</p>
                  <p className="text-color-primary">Title: {collectionItem.anime_title || "N/A"}</p>
                </div>

                {/* Delete Button */}
                <div className="ml-auto">
                  <button
                    onClick={() => handleDelete(collectionItem.id)}
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
    </div>
  );
};

export default CollectionList;
