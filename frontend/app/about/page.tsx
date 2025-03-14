'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Zap, Globe, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"

const features = [
  { icon: Users, title: "Expert Team", description: "Our team of experienced developers and network engineers are passionate about DNS." },
  { icon: Zap, title: "Lightning Fast", description: "Perform DNS tests with minimal overhead and maximum speed." },
  { icon: Globe, title: "Global Reach", description: "Test your DNS configuration from multiple locations worldwide." },
  { icon: Shield, title: "Secure Testing", description: "All tests are performed in a secure, isolated environment." },
]

const stats = [
  { value: "10M+", label: "DNS Queries Processed" },
  { value: "99.99%", label: "Uptime" },
  { value: "150+", label: "Countries Served" },
  { value: "24/7", label: "Support" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-indigo-50 text-gray-800 font-inter">
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
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-gray-800 font-poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About avoiDNS
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            avoiDNS is a cutting-edge DNS testing platform designed to simplify and streamline the process of verifying DNS configurations. Our mission is to empower developers, system administrators, and IT professionals with the tools they need to ensure their DNS setups are accurate and efficient.
          </motion.p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.h2 
              className="text-3xl font-bold mb-6 text-gray-800 font-poppins"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Founded in 2023, avoiDNS was born out of the frustration of dealing with complex DNS issues and the lack of user-friendly testing tools in the market. Our team of experienced developers and network engineers came together to create a solution that would make DNS testing accessible to everyone, regardless of their technical expertise.
            </motion.p>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              At avoiDNS, we believe that robust DNS infrastructure is crucial for the smooth operation of websites and online services. That's why we've developed a platform that allows users to test their DNS configurations quickly and easily, identifying potential issues before they impact end-users.
            </motion.p>
          </div>
          <motion.div 
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-full h-auto max-w-sm" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="150" r="120" fill="rgba(255,255,255,0.1)" />
              <path d="M200 30L80 150L200 270L320 150L200 30Z" fill="rgba(255,255,255,0.2)" />
              <path d="M200 70L120 150L200 230L280 150L200 70Z" fill="rgba(255,255,255,0.3)" />
              <circle cx="200" cy="150" r="40" fill="white" />
            </svg>
          </motion.div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 font-poppins">Why Choose avoiDNS?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-indigo-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center font-poppins">avoiDNS by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-indigo-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 font-poppins">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and IT professionals who trust avoiDNS for their DNS testing needs.
          </p>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Try avoiDNS for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 mt-16 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75 font-inter">
            © 2024 avoiDNS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

