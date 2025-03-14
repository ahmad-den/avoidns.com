'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, ArrowRight, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ExpiredPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-indigo-50 flex flex-col text-gray-800 font-inter">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 12.5L20 20L35 12.5L20 5Z" fill="url(#paint0_linear)" />
              <path d="M5 27.5L20 35L35 27.5" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 20L20 27.5L35 20" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear" x1="5" y1="12.5" x2="35" y2="12.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="5" y1="31.25" x2="35" y2="31.25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="5" y1="23.75" x2="35" y2="23.75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-poppins">avoiDNS</span>
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Contact</Link>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden bg-white/90 backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Contact</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 text-center"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 15 }}
              className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center"
            >
              <span role="img" aria-label="Sad face" className="text-4xl">😢</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 text-3xl font-extrabold text-gray-900"
            >
              Oops! Link Expired
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 text-sm text-gray-600"
            >
              The DNS route you're trying to access is no longer available.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      DNS routes are temporary and expire after a set period. To continue testing, you'll need to create a new route.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/" passHref>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105">
                Create a New DNS Route
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 font-poppins">Ready to Revolutionize Your DNS Testing?</h3>
          <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105">
            Get Started for Free
          </Button>
          <div className="mt-8 text-sm opacity-75 font-inter">
            © 2024 avoiDNS. All rights reserved.
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-indigo-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


