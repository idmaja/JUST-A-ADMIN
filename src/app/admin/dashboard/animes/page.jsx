"use client"

import AnimeAiringTab from "@/components/Dashboard/Anime/AnimeTab/AnimeAiringTab";
import AnimeFilterList from "@/components/Dashboard/Anime/AnimeFilterList";
import AnimeForm from "@/components/Dashboard/Anime/AnimeForm";
import AnimeRecentTab from "@/components/Dashboard/Anime/AnimeTab/AnimeRecentTab";
import AnimeTopTab from "@/components/Dashboard/Anime/AnimeTab/AnimeTopTab";
import Header from "@/components/Dashboard/Header";
import { useState } from 'react'

const Page = () => {
    const [activeTab, setActiveTab] = useState('airing');

    const [selectedAnime, setSelectedAnime] = useState(null);
    const [selectedAnimeRec, setSelectedAnimeRec] = useState(null);
    const [selectedAnimeTop, setSelectedAnimeTop] = useState(null);

    const clearForm = () => {
        setSelectedAnime(null);
        setSelectedAnimeRec(null);
        setSelectedAnimeTop(null);
    };

    return (
        <section className="w-full px-4 mt-4">
            <h1 className="mb-5 text-2xl font-bold text-color-secondary">Admin Dashboard - Manage Animes for Users</h1>
            
            <Header title={'Animes'}/>

            
            <div className="mt-4 tabs text-color-primary">
                <button 
                    className={`tab ${activeTab === 'airing' ? 'active bg-color-yellow transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary' : 'transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-white rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary'} mr-2`} 
                    onClick={() => {
                        setActiveTab('airing');
                        clearForm();
                    }}
                >
                    Airing Anime
                </button>
                <button 
                    className={`tab ${activeTab === 'spring' ? 'active bg-color-yellow transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary' : 'transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-white rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary'}`} 
                    onClick={() => {
                        setActiveTab('spring');
                        clearForm();
                    }}
                >
                    Spring Anime
                </button>
                <button 
                    className={`tab ${activeTab === 'top' ? 'active bg-color-yellow transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary' : 'transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-white rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary'}`} 
                    onClick={() => {
                        setActiveTab('top');
                        clearForm();
                    }}
                >
                    Popular Anime
                </button>
            </div>

            
            {activeTab === 'airing' && <AnimeAiringTab setSelectedAnime={setSelectedAnime} />}
            {activeTab === 'spring' && <AnimeRecentTab setSelectedAnimeRec={setSelectedAnimeRec} />}
            {activeTab === 'top' && <AnimeTopTab setSelectedAnimeTop={setSelectedAnimeTop} />}

            <Header title={'Input Form'}/>
            <div className="mt-4">
                <AnimeForm 
                    selectedAnime={selectedAnime} 
                    selectedAnimeRec={selectedAnimeRec} 
                    selectedAnimeTop={selectedAnimeTop} 
                    clearForm={clearForm} 
                />
            </div>

            <Header title={'List Animes for Users'}/>
            <div className="mt-4">
                <AnimeFilterList />
            </div>
        </section>
    );

};

export default Page;