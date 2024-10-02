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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
      >
        {/* Animated title */}
        <h1 className="mb-8 text-3xl font-extrabold text-center text-blue-600 animate-pulse">
          <Image src="../just-a-logo.svg" width={150} height={150}/>
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
            className="w-full p-3 text-lg font-semibold transition-all bg-blue-500 rounded-lg shadow-lg text-color-primary hover:bg-blue-600"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
