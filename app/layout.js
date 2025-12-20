import './globals.css'
import { Inter } from 'next/font/google'
import TermsAgreement from '@/components/TermsAgreement'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AbilityConnect - Social Platform for Disability Community',
  description: 'Connect, share, and support in an accessible environment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <TermsAgreement />
      </body>
    </html>
  )
}
