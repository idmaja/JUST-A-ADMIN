"use client"

import React, { useState, useEffect } from 'react';
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/Dashboard/Anime/AnimeList";
import { getAnimeResponse } from "@/services/api-service";

let debounceTimeout;

const AnimeRecentTab = ({ setSelectedAnimeRec }) => {
    const [pageRec, setPageRec] = useState(1);
    const [animesRec, setAnimeRec] = useState([]);

    const fetchRecAnime = async () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            try {
                const anime = await getAnimeResponse("seasons/2024/spring", `page=${pageRec}&&limit=8`);
                setAnimeRec(anime);
            } catch (error) {
                
            }
        }, 1000);
    };

    useEffect(() => {
        fetchRecAnime();
    }, [pageRec]);

    return (
        <>
            <Pagination page={pageRec} lastPage={animesRec.pagination?.last_visible_page} setPage={setPageRec} />
            <AnimeList api={animesRec} titleValue={true} setSelectedAnime={setSelectedAnimeRec} />
        </>
    );
};

export default AnimeRecentTab;
