"use client";

import { useEffect, useState } from "react";

const CommentsListHome = ({ comments }) => {

    const [visibleComments, setVisibleComments] = useState([]);
    const [index, setIndex] = useState(0); 
    const rowsPerPage = 2; 


    const [showTables, setShowTables] = useState(false);

    useEffect(() => {
      setVisibleComments(comments.slice(0, rowsPerPage));
      setShowTables(true);

      const interval = setInterval(() => {
        setShowTables(false); 

        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + rowsPerPage) % comments.length);
          setShowTables(true); 
        }, 300); 
      }, 3000); 

      
      return () => clearInterval(interval);
    }, [comments]);

    useEffect(() => {
      setVisibleComments(comments.slice(index, index + rowsPerPage));
    }, [index, comments]);

    return (
        <div className={`mb-12 transition-all duration-700 ${showTables ? 'animate-slideUp' : 'opacity-0'}`}>
            <table className="min-w-full border border-collapse border-gray-300 table-auto">
            <thead>
                <tr className="bg-color-secondary text-color-hover">
                <th className="px-4 py-2 border w-80">Anime Title</th>
                <th className="px-4 py-2 border w-96">Comment</th>
                <th className="px-4 py-2 border w-60">User Email</th>
                </tr>
            </thead>
            <tbody>
                {visibleComments.map(comment => (
                <tr key={comment.id}>
                    <td className="px-4 py-2 border">{comment.anime_title}</td>
                    <td className="px-4 py-2 border">{comment.comment}</td>
                    <td className="px-4 py-2 border">{comment.user_email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
};

export default CommentsListHome;