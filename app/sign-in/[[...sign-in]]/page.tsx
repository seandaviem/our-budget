import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Sign In | Our Budget',
    description: 'Sign in to your Budget portal.',
}
 
export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    );
}