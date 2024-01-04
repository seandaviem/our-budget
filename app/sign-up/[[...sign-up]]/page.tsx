import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Sign Up | Our Budget',
    description: 'Sign up to get access to your Budget portal.',
}

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignUp />
        </div>
    )
}