import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'avoiDNS - Test Your DNS With Confidence',
  description: 'avoiDNS is your ultimate DNS testing playground. Verify your configuration before going live with our powerful and easy-to-use platform.',
  keywords: ['DNS', 'testing', 'configuration', 'web development', 'domain name system'],
  authors: [{ name: 'avoiDNS Team' }],
  creator: 'avoiDNS',
  publisher: 'avoiDNS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avoidns.com',
    siteName: 'avoiDNS',
    title: 'avoiDNS - Test Your DNS With Confidence',
    description: 'Verify your DNS configuration before going live with avoiDNS, your ultimate DNS testing playground.',
    images: [
      {
        url: 'https://avoidns.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'avoiDNS - DNS Testing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'avoiDNS - Test Your DNS With Confidence',
    description: 'Verify your DNS configuration before going live with avoiDNS, your ultimate DNS testing playground.',
    images: ['https://avoidns.com/twitter-image.jpg'],
    creator: '@avoiDNS',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7D1606KQR"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z7D1606KQR');
        `
      }} />
      </head>
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "avoiDNS",
              "url": "https://avoidns.com",
              "description": "avoiDNS is your ultimate DNS testing playground. Verify your configuration before going live.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://avoidns.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  )
}


