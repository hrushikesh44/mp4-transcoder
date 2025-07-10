import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';  
import './globals.css'
import Home from './page';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


export const metadata: Metadata = {
  title: 'Video Transcoder',
  icons:{
    icon: "/favicon.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={`${GeistSans.className} antialiased`}>
           <Navbar />
          {children}
          <Footer />
        </body>
      </html>
  )
}