import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";

export default function Header() {

    return (
        <>
            <SignedIn>
                <SignedInNav />
            </SignedIn>
            <SignedOut>
                <SignedOutNav />
            </SignedOut>
        </>
    )
}
