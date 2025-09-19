import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'HOPE - AI-Powered Health Insights',
  description: 'Transform your health data into actionable insights with HOPE. AI-powered health monitoring that works with your devices to provide personalized guidance.',
  keywords: 'health, AI, wearables, monitoring, insights, healthcare, wellness',
  authors: [{ name: 'HOPE Team' }],
  metadataBase: new URL('https://hope-health.com'),
  openGraph: {
    title: 'HOPE - AI-Powered Health Insights',
    description: 'Transform your health data into actionable insights with HOPE.',
    url: 'https://hope-health.com',
    siteName: 'HOPE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HOPE - AI-Powered Health Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOPE - AI-Powered Health Insights',
    description: 'Transform your health data into actionable insights with HOPE.',
    images: ['/og-image.jpg'],
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}