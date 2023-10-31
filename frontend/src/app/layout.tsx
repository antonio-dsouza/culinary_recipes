import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@providers/sessionProvider'
import { ToastContainer } from 'react-toastify'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Culinary',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="bg-gradient-to-r from-[#FEDCC5] to-[#FEDDC6]" lang="en">
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          <ToastContainer />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
