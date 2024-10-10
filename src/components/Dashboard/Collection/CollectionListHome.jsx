"use client";

import { useEffect, useState } from "react";

const CollectionListHome = ({ collections }) => {

    const [visibleCollection, setVisibleCollection] = useState([]); 
    const [index, setIndex] = useState(0); 
    const rowsPerPage = 2; 

    // ANIMASI BUAT TABEL
    const [showTables, setShowTables] = useState(false);

    useEffect(() => {
      setVisibleCollection(collections.slice(0, rowsPerPage));
      setShowTables(true);

      const interval = setInterval(() => {
        setShowTables(false); 

        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + rowsPerPage) % collections.length);
          setShowTables(true); 
        }, 300); 
      }, 3000); 

      return () => clearInterval(interval);
    }, [collections]);

    useEffect(() => {
      setVisibleCollection(collections.slice(index, index + rowsPerPage));
    }, [index, collections]);

    return (
        <div className={`mb-12 transition-all duration-700 ${showTables ? 'animate-slideUp' : 'opacity-0'}`}>
        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead>
            <tr className="bg-color-secondary text-color-hover">
              <th className="w-48 px-4 py-2 border">Anime ID</th>
              <th className="px-4 py-2 border w-96">Anime Title</th>
              <th className="px-4 py-2 border w-96">User Email</th>
            </tr>
          </thead>
          <tbody>
            {visibleCollection.map(collection => (
              <tr key={collection.id}>
                <td className="px-4 py-2 border">{collection.anime_mal_id}</td>
                <td className="px-4 py-2 border">{collection.anime_title}</td>
                <td className="px-4 py-2 border">{collection.user_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
};

export default CollectionListHome;