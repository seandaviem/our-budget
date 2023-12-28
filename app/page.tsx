import Image from 'next/image'
import { auth } from '@clerk/nextjs';

export default function Home() {

    const authObj = auth()

    return (
        <main>
            <pre>{JSON.stringify(authObj, null, 2)}</pre>
        </main>
    )
}
