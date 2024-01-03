import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import SignedInNav from "@/components/SignedInNav";

export default function Header() {

    return (
        <header className="xs:flex justify-between items-center px-8 py-4">
            <div className="logo">
                <h1 className="text-3xl text-white">My Budget</h1>
            </div>
            <nav>
                <SignedIn>
                    <SignedInNav />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </nav>
        </header>
    )
}