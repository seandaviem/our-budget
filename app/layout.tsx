import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '../partials/Header/Header'
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
            <head>
                <ColorSchemeScript defaultColorScheme='dark' />
            </head>
            <ClerkProvider>
                <body className={`${archivo.variable} ${openSans.variable}`}> 
                    <MantineProvider defaultColorScheme='dark'>
                        <Header />     
                        {children}
                    </MantineProvider>
                </body>
            </ClerkProvider>
        </html>
    )
}
