"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to dashboard if already logged in
    }
  }, [session]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError(result.error); // Display error if sign-in fails
      console.error("Sign in error:", result.error);
    } else {
      router.push("/"); // Redirect to dashboard after successful login
    }
  };

  return (
    <div className="flex items-center justify-center mt-56 min-h-80 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 space-y-6 rounded-lg shadow-xl bg-slate-200"
      >
        {/* Animated title */}
        <h1 className="flex flex-col items-center justify-center mb-8 text-3xl font-extrabold text-center text-color-dark">
          <Image src="../just-a-logo.svg" width={1000} height={1000} className="w-16 h-16 mb-2" />
          Dashboard <span className="mt-1 text-color-yellow">JUST-A</span> 
        </h1>


        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 mb-4 text-center rounded-lg shadow-md text-color-primary bg-color-red "
              >
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.05 }}
            />

            <motion.input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 text-lg font-semibold text-black transition-all border rounded-lg shadow-lg border-color-blue hover:bg-blue-600 hover:text-white"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
