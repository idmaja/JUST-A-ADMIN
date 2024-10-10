"use client"

import React, { useState, useEffect } from 'react';
import Pagination from '../../../Utilities/Pagination';
import AnimeList from '../AnimeList';
import { getAnimeResponse } from "@/services/api-service";

let debounceTimeout;

const AnimeAiringTab = ({ setSelectedAnime }) => {
    const [page, setPage] = useState(1);
    const [animes, setAnime] = useState([]);

    const fetchAnime = async () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const anime = await getAnimeResponse("top/anime", `page=${page}&&filter=airing&&limit=8`);
                setAnime(anime);
            } catch (error) {
                console.error("Error fetching anime:", error);
            }
        }, 1000);
    };

    useEffect(() => {
        fetchAnime();
    }, [page]);

    return (
        <>
            <Pagination page={page} lastPage={animes.pagination?.last_visible_page} setPage={setPage} />
            <AnimeList api={animes} titleValue={true} setSelectedAnime={setSelectedAnime} />
        </>
    );
};

export default AnimeAiringTab;
