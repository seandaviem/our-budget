import { Archivo_Black, Open_Sans } from "next/font/google"

export const archivo = Archivo_Black({ 
    weight: "400", 
    subsets: ['latin'],
    variable: '--font-archivo'
})

export const openSans = Open_Sans({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ['latin'],
    variable: '--font-open-sans'
})