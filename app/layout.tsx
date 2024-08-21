import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ClerkProvider } from '@clerk/nextjs'
import Header from '../partials/Header/Header'
import { archivo, openSans } from '../helpers/fonts'
import { DatesProvider } from '@mantine/dates'

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
                        <DatesProvider settings={{ timezone: 'UTC' }}>
                            {children}
                        </DatesProvider>
                    </MantineProvider>
                </body>
            </ClerkProvider>
        </html>
    )
}
