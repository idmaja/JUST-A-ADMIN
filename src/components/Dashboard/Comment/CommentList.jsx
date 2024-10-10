"use client";

import { Play, Trash } from "@phosphor-icons/react";
import { useMemo } from "react";

// Function to group comments by username
const groupByUsername = (comments) => {
  return comments.reduce((acc, curr) => {
    if (!acc[curr.username]) {
      acc[curr.username] = []; // Create a new array for each username
    }
    acc[curr.username].push(curr); // Push comments with the same username to the array
    return acc;
  }, {});
};

const CommentList = ({ comment }) => {

  // Group comments by username
  const groupedComments = useMemo(() => groupByUsername(comment), [comment]);

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    await fetch(`/api/v1/admin/comments/${id}`, { method: "DELETE" });
    location.reload();  // Reload the page after deletion
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Render grouped comments by username */}
      {Object.keys(groupedComments).map((username) => (
        <div key={username} className="p-6 transition-all transform rounded-lg shadow-lg bg-color-accent hover:scale-105">
          {/* Username */}
          <div className="flex items-center mb-4">
            <Play size={20} weight="fill" className="mr-2 text-color-secondary" />
            <h3 className="text-lg font-bold text-color-primary">Username: {username || "N/A"}</h3>
          </div>
          
          {/* Group comments by anime_mal_id */}
          <div className="space-y-4">
            {groupedComments[username].map((commentItem) => (
              <div key={commentItem.id} className="p-4 rounded-lg shadow-md bg-color-primary">
                {/* Anime Info */}
                <p className="font-bold text-color-accent">Anime Title: {commentItem.anime_title || "N/A"}</p>
                <p className="text-color-accent">Comment: {commentItem.comment}</p>
                
                {/* Delete Button */}
                <div className="mt-2">
                  <button
                    onClick={() => handleDelete(commentItem.id)}
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
    </div>
  );
};

export default CommentList;
