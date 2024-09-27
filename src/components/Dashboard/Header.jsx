"use client";

import { useEffect, useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

const Header = ({title, linkHref, linkTitle}) => {
    // ANIMASI BUAT TABEL
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setShowHeader(true);
      }, 300);
    }, []);

    return (
        <div className= {`flex items-center justify-between mt-5 mb-2 -m-px ${showHeader ? 'animate-slideUp' : 'opacity-0'}`}>
            <div className="flex items-center">
                <Play size={28} weight="fill" className="mr-2 text-color-secondary"/>
                <h1 className="text-2xl font-bold text-color-primary">{title}</h1>
            </div>
            { linkHref && linkTitle ?
                <Link href={linkHref} className="transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-blue focus:outline-none bg-white 
                rounded-full border border-color-secondary hover:bg-color-secondary hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 
                dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                dark:hover:bg-gray-700 hover:no-underline">
                    {linkTitle}
                </Link>
                : null
            }
        </div>
    )
}

export default Header