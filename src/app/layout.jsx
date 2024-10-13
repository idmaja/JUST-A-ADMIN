// src/app/layout.jsx

"use client";

import { Gabarito, Roboto } from "next/font/google";
import { SessionProvider, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import { metadata } from "./metadata";
import { Archive, Chats, House, List, ListNumbers, SignOut, Slideshow, Users } from "@phosphor-icons/react";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"] 
});

export default function RootLayout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(true); // State to control navbar visibility
  const pathname = usePathname(); // Get the current route
  
  // Function to handle sign out and clear any stored tokens
  // const handleSignOut = async () => {
  //   if (typeof window !== "undefined") {
  //     // Clear local storage or any other client-side storage for tokens
  //     localStorage.removeItem("token");
  //     sessionStorage.removeItem("token");
  
  //     // Delete specific NextAuth cookies
  //     document.cookie = "next-auth.callback-url=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  //     document.cookie = "next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  
  //     // Redirect to the login page
  //     window.location.href = '/auth/login';
  //   }
  // };

  // Automatically hide the sidebar on /auth/login
  const isLoginPage = pathname === '/auth/login'; // Check if we are on the login page
  
  // Function to toggle the sidebar visibility
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/auth/login', // Redirects the user to the login page after signing out
    });
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${roboto.className} antialiased bg-color-dark scroll-smooth`}>
        <SessionProvider>
          <div className="flex min-h-screen">
            {/* Only render the sidebar if we are NOT on the /auth/login page */}
            {!isLoginPage && (
              <>
                {/* Toggle button for showing/hiding the navbar */}
                <button
                  onClick={toggleNavbar}
                  className="fixed z-50 p-2 bg-gray-600 rounded-lg text-color-primary top-4 left-4"
                >
                  <List size={32} weight="bold" />
                </button>

                {/* Sidebar */}
                <nav
                  className={`fixed left-0 top-0 w-64 bg-color-dark text-white h-full py-4 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isNavOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
                >
                  <ul className="flex-grow px-4 mt-16 space-y-4">
                    <li className="gap-6 my-2">
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          href="/"
                          className="px-4 py-3 text-xl font-bold transition-all rounded hover:no-underline text-color-blue focus:outline-none border-color-accent hover:bg-color-hover hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-color-blue">
                            Home 
                            <House size={25} weight="bold" />
                        </Link>
                      </div>
                    </li>
                    <li className="gap-6 my-2">
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          href="/admin/dashboard/users"
                          className="px-4 py-3 text-xl font-bold transition-all rounded hover:no-underline text-color-blue focus:outline-none border-color-accent hover:bg-color-hover hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-color-blue">
                            Accounts 
                            <Users size={25} weight="bold" />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          href="/admin/dashboard/collection"
                          className="px-4 py-3 text-xl font-bold transition-all rounded hover:no-underline text-color-blue focus:outline-none border-color-accent hover:bg-color-hover hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-color-blue">
                          Collection
                          <Archive size={25} weight="bold" />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          href="/admin/dashboard/comments"
                          className="px-4 py-3 text-xl font-bold transition-all rounded hover:no-underline text-color-blue focus:outline-none border-color-accent hover:bg-color-hover hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-color-blue">
                          Comments
                          <Chats size={25} weight="bold" />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          href="/admin/dashboard/animes"
                          className="px-4 py-3 text-xl font-bold transition-all rounded hover:no-underline text-color-blue focus:outline-none border-color-accent hover:bg-color-hover hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-color-blue">
                          Anime
                          <Slideshow size={32} />
                        </Link>
                      </div>
                    </li>
                  </ul>

                  {/* Centering Sign Out Button */}
                  <div className="flex justify-center mb-4">
                      {/* <Link 
                        href="/auth/login"
                        className="flex items-center justify-center px-5 py-2 text-lg font-medium transition-all bg-white border rounded-full gap-x-2 text-color-blue focus:outline-none border-color-secondary hover:bg-color-red hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:no-underline">
                          Sign Out
                          <SignOut size={15} weight="bold" />
                      </Link> */}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center px-5 py-2 text-lg font-medium transition-all border rounded-full gap-x-2 text-color-blue focus:outline-none border-color-secondary hover:bg-color-red hover:no-underline"
                    >
                      Sign Out
                      <SignOut size={15} weight="bold" />
                    </button>
                  </div>
                </nav>
              </>
            )}

            {/* Main content area */}
            <main
              className={`flex-grow p-8 transition-margin-left duration-300 ease-in-out ${!isLoginPage && isNavOpen ? 'ml-64' : 'ml-0'}`}
            >
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
