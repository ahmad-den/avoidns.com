'use client'

import { useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Zap, Smartphone, Calendar, ShieldCheck, Share2, Menu, Copy, Check, Clock, Server, ArrowRight, X, ArrowUpRight, Cloud } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { logError } from '../utils/logger';


const FlipCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="h-80 w-full perspective cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-all duration-500 ease-in-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-0"></div>
          <Icon className="w-20 h-20 text-indigo-600 mb-4 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
          <h3 className={`text-2xl font-bold mb-2 text-gray-800 text-center relative z-10`}>{title}</h3>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 shadow-lg flex items-center justify-center rotate-y-180 overflow-hidden">
          <p className={`text-white text-center relative z-10 text-lg`}>{description}</p>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-pink-400 rounded-full opacity-50 blur-2xl"></div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LandingPage() {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [domain, setDomain] = useState('')
  const [serverIp, setServerIp] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayTime, setDisplayTime] = useState(formatTime(timeLeft))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://avoidns.com/api/generate-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ domain, serverIp }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedUrl(data.generatedUrl)
        setIsDialogOpen(true)
        startTimer()
      } else {
        const errorMessage = data.error || 'Failed to generate route. Please try again.'
        setError(errorMessage)
        logError(errorMessage, data)
      }
    } catch (error) {
      const errorMessage = 'An error occurred. Please try again.'
      setError(errorMessage)
      logError(errorMessage, error)
    } finally {
      setIsLoading(false)
    }
  }


  const startTimer = () => {
    setTimeLeft(60 * 60) // Reset to 60 minutes
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000) // Update every 1000ms (1 second)
  }


  useEffect(() => {
    setDisplayTime(formatTime(timeLeft))
  }, [timeLeft])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const hosts = [
    { name: "BigScoots", icon: Cloud, url: "https://www.bigscoots.com/" },
    { name: "Cloudways", icon: Cloud, url: "https://www.cloudways.com/" },
    { name: "SiteGround", icon: Cloud, url: "https://www.siteground.com/" },
    { name: "Kinsta", icon: Cloud, url: "https://kinsta.com/" },
    { name: "Bluehost", icon: Cloud, url: "https://www.bluehost.com/" },
    { name: "WP Engine", icon: Cloud, url: "https://wpengine.com/" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-indigo-50 text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
            <span className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600`}>avoiDNS</span>
          </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

      <main className="container mx-auto px-4 py-16">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50 via-white to-indigo-50 opacity-50 z-0" />

        <div className="flex flex-col lg:flex-row gap-12 items-center relative">
          <motion.div 
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Test Your DNS
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
              With Confidence
            </h2>
            <p className="text-xl text-gray-600">
              avoiDNS is your ultimate DNS testing playground. Verify your configuration
              before going live. Powerful, yet incredibly easy to use.
            </p>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 bg-white rounded-xl p-8 shadow-xl backdrop-blur-lg bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className={`text-3xl font-bold mb-6 text-gray-800`}>Create DNS Route</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-transparent"
                required
                disabled={isLoading}
              />
              <Input
                type="text"
                placeholder="Enter server IP"
                value={serverIp}
                onChange={(e) => setServerIp(e.target.value)}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-transparent"
                required
                disabled={isLoading}
              />
              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Route...
                    </div>
                  ) : (
                    'Generate Route'
                  )}
                </Button>
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className={`text-4xl font-bold mb-4 text-gray-800`}>Trusted by Developers Worldwide</h2>
          <p className={`text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse`}>
            10000+ Routes Generated
          </p>
        </motion.div>

        <div className="mt-32">
          <h2 className={`text-5xl font-bold text-center mb-16 text-gray-800`}>Why Choose avoiDNS?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Effortless Setup", description: "Simply enter the IP address and URL. We'll handle the rest, making DNS testing a breeze." },
              { icon: Smartphone, title: "Device Agnostic", description: "No need for complex host file setups or proxies. Test across all devices effortlessly." },
              { icon: Calendar, title: "Planned Launches", description: "Build and test your website behind the scenes. Update DNS when you're ready to go live." },
              { icon: ShieldCheck, title: "Simplified Security", description: "HTTPS available for all projects. Ensure your test environment is as secure as production." },
              { icon: Share2, title: "Easy Sharing", description: "Collaborate seamlessly. Share your test environment with team members and clients instantly." },
              { icon: Zap, title: "Incredibly Fast", description: "Adds a very minimal overhead to requests, no performance impact." },
            ].map((feature, index) =>
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <FlipCard icon={feature.icon} title={feature.title} description={feature.description} />
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-32">
          <h2 className={`text-5xl font-bold text-center mb-16 text-gray-800`}>Compatible With Your Favorite Hosts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {hosts.map((host, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-rotate-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <a 
                  href={host.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full h-full flex flex-col items-center justify-center space-y-4 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors duration-300">
                    <host.icon className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className={`text-gray-700 text-lg font-semibold group-hover:text-indigo-600 transition-colors duration-300`}>{host.name}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 mt-32 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className={`text-3xl font-bold mb-6`}>Ready to Revolutionize Your DNS Testing?</h3>
          <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105">
            Get Started for Free
          </Button>
          <div className="mt-12 text-sm opacity-75">
            © 2024 avoiDNS. All rights reserved.
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-indigo-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-8 text-center">
        <Link href="/report" className="inline-flex items-center text-white hover:text-indigo-200 transition-colors">
          View Report
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl overflow-hidden p-0 border-0 bg-white text-gray-800 shadow-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 15 }}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-green-400"
                >
                  <Check className="w-5 h-5 text-white stroke-[3]" />
                </motion.div>
                Your DNS Route is Ready!
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Use this generated URL for testing your DNS configuration.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className={`text-sm font-medium text-gray-700`}>Original Domain</h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <p className="text-sm flex-grow font-mono text-gray-800">{domain}</p>
                  <button 
                    onClick={() => copyToClipboard(domain, 'domain')}
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                  >
                    {copied === 'domain' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </motion.div>
              </div>
              <div className="space-y-2">
                <h3 className={`text-sm font-medium text-gray-700`}>Generated URL</h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <p className="text-sm flex-grow break-all font-mono text-gray-800">{generatedUrl}</p>
                  <button 
                    onClick={() => copyToClipboard(generatedUrl, 'url')}
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                  >
                    {copied === 'url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center text-amber-600"
              >
                <Clock className="w-4 h-4 mr-2" />
                <p className="text-sm">This link will expire in {displayTime}</p>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


