"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';
import AnimeEditModal from './AnimeEditModal';
import DeleteAnimeModal from './DeleteAnimeModal';
import Pagination from '../../Utilities/Pagination';
import { Trash } from '@phosphor-icons/react';

const AnimeFilterList = () => {
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [animeToDelete, setAnimeToDelete] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const [animatedPage, setAnimatedPage] = useState(false);

    // Fetch anime data on component mount
    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await fetch('/api/v1/admin/animes');
                const data = await response.json();
                setAnime(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching anime:', error);
                setLoading(false);
            }
        };

        fetchAnime();
    }, []);

    // Pagination logic
    const lastPage = Math.ceil(anime.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAnime = anime.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change with animation
    const handlePageChange = (newPage) => {
        setAnimatedPage(true); // Trigger animation
        setTimeout(() => {
            setCurrentPage(newPage); // Change the page after animation
            setAnimatedPage(false); // Remove animation
        }, 300); // Animation duration (300ms)
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/v1/admin/animes/${animeToDelete.id}`, { method: 'DELETE' });
            setAnime(anime.filter(item => item.id !== animeToDelete.id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting anime:', error);
        }
    };

    const handleDeleteClick = (anime) => {
        setAnimeToDelete(anime);
        setIsDeleteModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedAnime(null);
    };

    const handleUpdate = async (updatedAnime) => {
        try {
            const response = await fetch(`/api/v1/admin/animes/${updatedAnime.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAnime),
            });

            if (response.ok) {
                setAnime(anime.map(a => (a.id === updatedAnime.id ? updatedAnime : a)));
                setIsModalOpen(false);
            } else {
                console.error('Failed to update anime');
            }
        } catch (error) {
            console.error('Error updating anime:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mb-12 transition-all duration-500">
            <table className="w-full border border-collapse border-gray-300 table-auto">
                <thead>
                    <tr className="bg-color-secondary text-color-hover">
                        <th className="w-20 px-4 py-2 border">Anime ID</th>
                        <th className="px-4 py-2 border w-96">Anime Title</th>
                        <th className="w-16 px-4 py-2 border">Anime Type</th>
                        <th className="w-24 px-4 py-2 border">Anime Image</th>
                        <th className="px-4 py-2 border w-60">Description</th>
                        <th className="w-12 px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody className={`text-center text-color-primary transition-opacity duration-300 ${animatedPage ? 'opacity-0' : 'opacity-100'}`}>
                    {currentAnime.map((anime) => (
                        <tr key={anime.id}>
                            <td className="px-4 py-2 border">{anime.anime_mal_id}</td>
                            <td className="px-4 py-2 text-xl border">{anime.anime_title}</td>
                            <td className="px-4 py-2 border">{anime.anime_type}</td>
                            <td className="flex justify-center px-4 py-2 border">
                                <Image
                                    src={anime.anime_image_url}
                                    width={80}
                                    height={80}
                                    className="object-cover h-20 text-center rounded-md"
                                    alt={anime.anime_title || "Anime image"}
                                />
                            </td>
                            <td className="px-4 py-2 uppercase border">{anime.desc}</td>
                            <td className="px-4 py-2 uppercase border">
                                <button onClick={() => handleDeleteClick(anime)} className="ml-2 transition-all text-color-red hover:text-color-secondary">
                                    <Trash size={28} weight="fill" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination component */}
            <Pagination page={currentPage} lastPage={lastPage} setPage={handlePageChange} />

            {/* AnimeEditModal component */}
            <AnimeEditModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                anime={selectedAnime}
                onUpdate={handleUpdate}
            />

            {/* AnimeDeleteModal component */}
            <DeleteAnimeModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default AnimeFilterList;
