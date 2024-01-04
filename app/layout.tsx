import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '../partials/Header'
import { archivo, openSans } from '../helpers/fonts'

export const metadata: Metadata = {
    title: 'Our Budget',
    description: 'A place to keep track of spending.',
}
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={`${archivo.variable} ${openSans.variable} bg-gray-900`}> 
                    <Header />     
                    {children}
                </body>
            </ClerkProvider>
        </html>
    )
}
