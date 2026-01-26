"use client"

import React, { useState, useEffect } from 'react';
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/Dashboard/Anime/AnimeList";
import { getAnimeResponse } from "@/services/api-service";

let debounceTimeout;

const AnimeTopTab = ({ setSelectedAnimeTop }) => {
    const [pageTop, setPageTop] = useState(1);
    const [animesTop, setAnimeTop] = useState([]);

    const fetchTopAnime = async () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const anime = await getAnimeResponse("top/anime", `page=${pageTop}&&limit=8`);
                setAnimeTop(anime);
            } catch (error) {
                
            }
        }, 1000);
    };

    useEffect(() => {
        fetchTopAnime();
    }, [pageTop]);

    return (
        <>
            <Pagination page={pageTop} lastPage={animesTop.pagination?.last_visible_page} setPage={setPageTop} />
            <AnimeList api={animesTop} titleValue={true} setSelectedAnime={setSelectedAnimeTop} />
        </>
    );
};

export default AnimeTopTab;
