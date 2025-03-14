'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactInfo = [
  { icon: Mail, title: "Email", content: "support@avoidns.com" },
  { icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
  { icon: MapPin, title: "Address", content: "123 DNS Street, Server City, 12345" },
]

export default function ContactPage() {
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
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-800 font-poppins">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to us using the form below or through our contact information.
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.section 
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 font-poppins">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." rows={5} />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 font-semibold">
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.section>

          <motion.section 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 font-poppins">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="w-6 h-6 mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 font-poppins">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">What is avoiDNS?</h3>
                  <p className="text-gray-600">avoiDNS is a cutting-edge DNS testing platform designed to simplify and streamline the process of verifying DNS configurations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">How can I get started?</h3>
                  <p className="text-gray-600">Simply sign up for an account on our website and you can start testing your DNS configurations right away.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do you offer support?</h3>
                  <p className="text-gray-600">Yes, we offer 24/7 support to all our customers. You can reach out to us via email or phone at any time.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 font-poppins">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and IT professionals who trust avoiDNS for their DNS testing needs.
          </p>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Try avoiDNS for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.section>
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

