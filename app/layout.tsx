import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'AbilityConnect - Social Community for People with Disabilities',
    template: '%s | AbilityConnect'
  },
  description: 'Connect, share, and empower each other. A safe social platform for people with disabilities to chat, share stories, and build community.',
  keywords: ['disability', 'community', 'social platform', 'accessibility', 'support', 'chat'],
  authors: [{ name: 'AbilityConnect Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-white">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
