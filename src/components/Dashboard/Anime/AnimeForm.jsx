"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SuccessModal from './SuccessModal';

const AnimeForm = ({ selectedAnime, selectedAnimeRec, selectedAnimeTop, clearForm }) => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    anime_mal_id: '',
    anime_title: '',
    anime_score: '',
    anime_type: '',
    anime_image_url: '',
    desc: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showAlreadyModal, setShowAlreadyModal] = useState(false);

  useEffect(() => {
    if (selectedAnime) {
      setFormData({
        anime_mal_id: String(selectedAnime.mal_id) || selectedAnime.mal_id || '',
        anime_title: selectedAnime.title || '',
        anime_score: selectedAnime.score || '',
        anime_type: selectedAnime.type || '',
        anime_image_url: selectedAnime.images?.webp?.large_image_url || '',
        desc: ''
      });
    } else if (selectedAnimeRec) {
      setFormData({
        anime_mal_id: String(selectedAnimeRec.mal_id) || selectedAnimeRec.mal_id || '',
        anime_title: selectedAnimeRec.title || '',
        anime_score: selectedAnimeRec.score || '',
        anime_type: selectedAnimeRec.type || '',
        anime_image_url: selectedAnimeRec.images?.webp?.large_image_url || '',
        desc: ''
      });
    } else if (selectedAnimeTop) {
      setFormData({
        anime_mal_id: String(selectedAnimeTop.mal_id) || selectedAnimeTop.mal_id || '',
        anime_title: selectedAnimeTop.title || '',
        anime_score: selectedAnimeTop.score || '',
        anime_type: selectedAnimeTop.type || '',
        anime_image_url: selectedAnimeTop.images?.webp?.large_image_url || '',
        desc: ''
      });
    }
  }, [selectedAnime, selectedAnimeRec, selectedAnimeTop]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/admin/animes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === 409) {
        // alert(result.message);
        setShowAlreadyModal(true); 
        setTimeout(() => {
          setShowAlreadyModal(false); 
        }, 3000); 
      } else if (result.isCreated) {
        setShowSuccessModal(true); 
        setTimeout(() => {
          setShowSuccessModal(false); 
          router.refresh();
        }, 3000); 
      } else {
        setShowFailedModal(true); 
        setTimeout(() => {
          setShowFailedModal(false); 
        }, 3000);
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
            <label className="block mb-2 text-sm font-medium text-color-primary">Anime ID</label>
            <input
              type="text"
              name="anime_mal_id"
              value={formData.anime_mal_id}
              className="w-full p-3 bg-gray-600 rounded-lg text-color-primary"
              readOnly
              disabled
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Anime Title</label>
            <input
              type="text"
              name="anime_title"
              value={formData.anime_title}
              className="w-full p-3 bg-gray-600 rounded-lg text-color-primary"
              readOnly
              disabled
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Score</label>
            <input
              type="text"
              name="anime_score"
              value={formData.anime_score}
              className="w-full p-3 bg-gray-600 rounded-lg text-color-primary"
              readOnly
              disabled
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Type</label>
            <input
              type="text"
              name="anime_type"
              value={formData.anime_type}
              className="w-full p-3 bg-gray-600 rounded-lg text-color-primary"
              readOnly
              disabled
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-color-primary">Image URL</label>
            <input
              type="text"
              name="anime_image_url"
              value={formData.anime_image_url}
              className="w-full p-3 bg-gray-600 rounded-lg text-color-primary"
              readOnly
              disabled
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-color-primary">Description</label>
            <select
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg"
              required
            >
              <option value="">Select description</option>
              <option value="Popular">Popular Anime</option>
              <option value="Spring">Spring Anime</option>
              <option value="Airing">Top Airing</option>
            </select>
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full px-5 py-3 mt-6 mb-2 text-sm font-medium transition-all border rounded-full me-2 text-color-primary border-color-secondary hover:bg-color-yellow hover:text-color-primary"
        >
          Input Anime
        </button>
      </form>

      {showSuccessModal && (
        <SuccessModal message="Anime created successfully!" />
      )}

      {showFailedModal && (
        <SuccessModal message="Anime failed to input, try again!" />
      )}

      {showAlreadyModal && (
        <SuccessModal message="Anime with this ID already exists!" />
      )}
    </>
  );
};

export default AnimeForm;
