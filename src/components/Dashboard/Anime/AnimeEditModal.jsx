"use client"

import { useEffect, useState } from 'react';

const AnimeEditModal = ({ isOpen, onClose, anime, onUpdate }) => {
    const [formData, setFormData] = useState({
      id: '',  // Tambahkan id ke dalam formData
      anime_mal_id: '',
      anime_title: '',
      anime_type: '',
      anime_image_url: '',
      desc: ''
    });
  
    useEffect(() => {
      if (anime) {
        setFormData({
          id: anime.id || '',  // Simpan ID anime
          anime_mal_id: String(anime.anime_mal_id || ''),
          anime_title: anime.anime_title || '',
          anime_type: anime.anime_type || '',
          anime_image_url: anime.anime_image_url || '',
          desc: anime.desc || ''
        });
      }
    }, [anime]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(formData);  // Kirim formData lengkap termasuk id
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white rounded-lg w-96">
          <h2 className="mb-4 text-lg font-bold">Update Anime</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Anime MAL ID</label>
              <input
                type="text"
                name="anime_mal_id"
                value={formData.anime_mal_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Anime Title</label>
              <input
                type="text"
                name="anime_title"
                value={formData.anime_title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Anime Type</label>
              <input
                type="text"
                name="anime_type"
                value={formData.anime_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Anime Image URL</label>
              <input
                type="text"
                name="anime_image_url"
                value={formData.anime_image_url}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 mr-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default AnimeEditModal;
